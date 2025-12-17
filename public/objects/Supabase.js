import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

class Supabase {
    constructor() {
      const supabaseUrl = "https://jwvbtggiyoaqzrmvozgq.supabase.co"
      const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3dmJ0Z2dpeW9hcXpybXZvemdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMTgzNjQsImV4cCI6MjA3NzU5NDM2NH0.qEjeIUB1-aHKkM7CbpCPknyo32HOUzTlfHTUanFqfDs"      
      this.SB = createClient(supabaseUrl, supabaseKey)
      this.currentUser = null
    }

    async insert(table, row) {
      try {
        const { data, error } = await this.SB.from(table).insert([row]).select()
        if (error) throw error
        return { success: true, data: data[0], error: null }
      } catch (error) {
        console.error(`Error inserting in ${table}:`, error)
        return { success: false, data: null, error }
      }
    }

    async update(table, id, changes) {
      try {
        const { data, error } = await this.SB.from(table).update(changes).eq('id', id).select()
        if (error) throw error
        return { success: true, data: data[0], error: null }
      } catch (error) {
        console.error(`Error updating ${table}:`, error)
        return { success: false, data: null, error }
      }
    }

    async delete(table, id) {
      try {
        const { data, error } = await this.SB.from(table).delete().eq('id', id).select()
        if (error) throw error
        return { success: true, data: data[0], error: null }
      } catch (error) {
        console.error(`Error deleting from ${table}:`, error)
        return { success: false, data: null, error }
      }
    }

    async getById(table, id) {
      try {
        const { data, error } = await this.SB.from(table).select('*').eq('id', id).single()
        if (error) throw error
        return { success: true, data, error: null }
      } catch (error) {
        console.error(`Error getting from ${table}:`, error)
        return { success: false, data: null, error }
      }
    }

    async getAll(table, filters = {}) {
      try {
        let query = this.SB.from(table).select('*')
        Object.keys(filters).forEach(key => {
          query = query.eq(key, filters[key])
        })
        const { data, error } = await query
        if (error) throw error
        return { success: true, data, error: null }
      } catch (error) {
        console.error(`Error getting all from ${table}:`, error)
        return { success: false, data: null, error }
      }
    }

    // U S E R

    async createUser(userData) {
      return await this.insert('usuario', userData)
    }

    async updateUser(userId, changes) { 
      return await this.update('usuario', userId, changes)
    }

    async getUserByEmail(email) {
        try {
            const { data, error } = await this.SB
                .from('usuario')
                .select('*')
                .eq('email', email)
                .single()

            if (error && error.code !== 'PGRST116') {
                return { success: false, error: error.message }
            }

            return { success: true, data: data || null }
        } catch (error) {
            return { success: false, error: error.message }
        }
    }

    async setUserOnlineStatus(userId, isOnline) {
      return await this.update('usuario', userId, { is_online: isOnline })
    }

    async setUserActiveStatus(userId, isActive) {
      return await this.update('usuario', userId, { is_active: isActive })
    }

    // S U B J E C T

    async createSubject(subjectData) {
      return await this.insert('subject', subjectData)
    }

    async updateSubject(subjectId, changes) {
      return await this.update('subject', subjectId, changes)
    }

    async deleteSubject(subjectId) {
      return await this.delete('subject', subjectId)
    }

    async getAllSubjects() {
      return await this.getAll('subject')
    } 

    // S E C T I O N

    async createRoom(roomData) {
      return await this.insert('room', roomData)
    }

    async updateRoom(roomId, changes) {
      return await this.update('room', roomId, changes)
    }

    async deleteRoom(roomId) {
      return await this.delete('room', roomId)
    }

    async getRoomsBySubject(subjectId) {
      return await this.getAll('room', { subject_id: subjectId })
    }

    async getRoomWithDetails(roomId) {
      try {
        const { data, error } = await this.SB
          .from('room')
          .select(`
            *,
            subject:subject_id (*),
            forms:form (*)
          `)
          .eq('id', roomId)
          .single()
        
        if (error) throw error
        return { success: true, data, error: null }
      } catch (error) {
        console.error('Error getting room details:', error)
        return { success: false, data: null, error }
      }
    }

    // F O R M

    async createForm(formData) {
      return await this.insert('form', formData)
    }

    async updateForm(formId, changes) {
      return await this.update('form', formId, changes)
    }

    async deleteForm(formId) {
      return await this.delete('form', formId)
    }

    async getFormsByRoom(roomId) {
      return await this.getAll('form', { room_id: roomId })
    }

    async getFormWithContent(formId) {
      try {
        const { data, error } = await this.SB
          .from('form')
          .select(`
            *,
            room:room_id (*),
            form_tools:form_tool (
              *,
              tool:tool_id (*)
            ),
            form_quizzes:form_quiz (
              *,
              quiz:quiz_id (*)
            )
          `)
          .eq('id', formId)
          .single()
        
        if (error) throw error
        return { success: true, data, error: null }
      } catch (error) {
        console.error('Error getting form content:', error)
        return { success: false, data: null, error }
      }
    }

    // T O O L

    async createTool(toolData) {
      return await this.insert('tool', toolData)
    }

    async updateTool(toolId, changes) {
      return await this.update('tool', toolId, changes)
    }

    async deleteTool(toolId) {
      return await this.delete('tool', toolId)
    }

    async getAllTools() {
      return await this.getAll('tool')
    }

    async getToolsByCreator(userId) {
      return await this.getAll('tool', { created_by: userId })
    }

    // Q U I Z

    async createQuiz(quizData) {
      return await this.insert('quiz', quizData)
    }

    async updateQuiz(quizId, changes) {
      return await this.update('quiz', quizId, changes)
    }

    async deleteQuiz(quizId) {
      return await this.delete('quiz', quizId)
    }

    async getAllQuizzes() {
      return await this.getAll('quiz')
    }

    async getQuizzesByCreator(userId) {
      return await this.getAll('quiz', { created_by: userId })
    }

    // R E L A T I O N S H I P S

    async enrollUserInRoom(usuarioId, roomId, role = 'student') {
      try {
        const { data, error } = await this.SB
          .from('usuario_room')
          .insert([{
            usuario_id: usuarioId,
            room_id: roomId,
            role_in_room: role
          }])
          .select()
        
        if (error) throw error
        return { success: true, data: data[0], error: null }
      } catch (error) {
        console.error('Error enrolling user:', error)
        return { success: false, data: null, error }
      }
    }

    async unenrollUserFromRoom(usuarioId, roomId) {
      try {
        const { data, error } = await this.SB
          .from('usuario_room')
          .delete()
          .eq('usuario_id', usuarioId)
          .eq('room_id', roomId)
          .select()
        
        if (error) throw error
        return { success: true, data: data[0], error: null }
      } catch (error) {
        console.error('Error unenrolling user:', error)
        return { success: false, data: null, error }
      }
    }

    async getUserRooms(usuarioId) {
      try {
        const { data, error } = await this.SB
          .from('usuario_room')
          .select(`
            *,
            room:room_id (
              *,
              subject:subject_id (*)
            )
          `)
          .eq('usuario_id', usuarioId)
        
        if (error) throw error
        return { success: true, data, error: null }
      } catch (error) {
        console.error('Error getting user rooms:', error)
        return { success: false, data: null, error }
      }
    }

    async getRoomUsers(roomId, role = null) {
      try {
        let query = this.SB
          .from('usuario_room')
          .select(`
            *,
            usuario:usuario_id (*)
          `)
          .eq('room_id', roomId)
        
        if (role) {
          query = query.eq('role_in_room', role)
        }
        
        const { data, error } = await query
        if (error) throw error
        return { success: true, data, error: null }
      } catch (error) {
        console.error('Error getting room users:', error)
        return { success: false, data: null, error }
      }
    }

    async addToolToForm(formId, toolId, position = 0) {
      try {
        const { data, error } = await this.SB
          .from('form_tool')
          .insert([{
            form_id: formId,
            tool_id: toolId,
            position
          }])
          .select()
        
        if (error) throw error
        return { success: true, data: data[0], error: null }
      } catch (error) {
        console.error('Error adding tool to form:', error)
        return { success: false, data: null, error }
      }
    }

    async removeToolFromForm(formToolId) {
      return await this.delete('form_tool', formToolId)
    }

    async updateToolPosition(formToolId, newPosition) {
      return await this.update('form_tool', formToolId, { position: newPosition })
    }

    async addQuizToForm(formId, quizId, position = 0) {
      try {
        const { data, error } = await this.SB
          .from('form_quiz')
          .insert([{
            form_id: formId,
            quiz_id: quizId,
            position
          }])
          .select()
        
        if (error) throw error
        return { success: true, data: data[0], error: null }
      } catch (error) {
        console.error('Error adding quiz to form:', error)
        return { success: false, data: null, error }
      }
    }

    async removeQuizFromForm(formQuizId) {
      return await this.delete('form_quiz', formQuizId)
    }

    async updateQuizPosition(formQuizId, newPosition) {
      return await this.update('form_quiz', formQuizId, { position: newPosition })
    }

    async startSession(usuarioId, roomId) {
      try {
        const { data, error } = await this.SB
          .from('usuario_time')
          .insert([{
            usuario_id: usuarioId,
            room_id: roomId,
            start_datetime: new Date().toISOString()
          }])
          .select()
        
        if (error) throw error
        return { success: true, data: data[0], error: null }
      } catch (error) {
        console.error('Error starting session:', error)
        return { success: false, data: null, error }
      }
    }

    async endSession(timeId) {
      try {
        const endTime = new Date()      
        const { data: session, error: getError } = await this.SB
          .from('usuario_time')
          .select('*')
          .eq('id', timeId)
          .single()
        
        if (getError) throw getError
        const startTime = new Date(session.start_datetime)
        const lapseSeconds = (endTime - startTime) / 1000
        const { data, error } = await this.SB
          .from('usuario_time')
          .update({
            end_datetime: endTime.toISOString(),
            lapse_seconds: lapseSeconds
          })
          .eq('id', timeId)
          .select()
        
        if (error) throw error
        return { success: true, data: data[0], error: null }
      } catch (error) {
        console.error('Error ending session:', error)
        return { success: false, data: null, error }
      }
    }

    async getActiveSession(usuarioId, roomId) {
      try {
        const { data, error } = await this.SB
          .from('usuario_time')
          .select('*')
          .eq('usuario_id', usuarioId)
          .eq('room_id', roomId)
          .is('end_datetime', null)
          .order('start_datetime', { ascending: false })
          .limit(1)
          .single()
        
        if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows
        return { success: true, data: data || null, error: null }
      } catch (error) {
        console.error('Error getting active session:', error)
        return { success: false, data: null, error }
      }
    }

    async getUserTimeByRoomAndDateRange(usuarioId, roomId, startDate, endDate) {
      try {
        const { data, error } = await this.SB
          .from('usuario_time')
          .select('*')
          .eq('usuario_id', usuarioId)
          .eq('room_id', roomId)
          .gte('start_datetime', startDate)
          .lte('start_datetime', endDate)
          .order('start_datetime', { ascending: false })
        
        if (error) throw error
        return { success: true, data, error: null }
      } catch (error) {
        console.error('Error getting user time:', error)
        return { success: false, data: null, error }
      }
    }

    async getRoomTotalTime(roomId, usuarioId = null) {
      try {
        let query = this.SB
          .from('usuario_time')
          .select('lapse_seconds')
          .eq('room_id', roomId)
          .not('end_datetime', 'is', null)
        
        if (usuarioId) {
          query = query.eq('usuario_id', usuarioId)
        }
        
        const { data, error } = await query
        if (error) throw error
        
        const totalSeconds = data.reduce((sum, record) => sum + (record.lapse_seconds || 0), 0)
        
        return { success: true, data: { totalSeconds, totalHours: totalSeconds / 3600 }, error: null }
      } catch (error) {
        console.error('Error calculating total time:', error)
        return { success: false, data: null, error }
      }
    }

    subscribeToUserTimes(roomId, callback) {
      return this.SB
        .channel(`room-${roomId}-times`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'usuario_time',
            filter: `room_id=eq.${roomId}`
          },
          callback
        )
        .subscribe()
    }

    subscribeToRoom(roomId, callback) {
      return this.SB
        .channel(`room-${roomId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'room',
            filter: `id=eq.${roomId}`
          },
          callback
        )
        .subscribe()
    }

    unsubscribe(channel) {
      this.SB.removeChannel(channel)
    }    


    async checkIfUserIsTeacher(usuarioId, roomId) {
      try {
        const { data, error } = await this.SB
          .from('usuario_room')
          .select('role_in_room')
          .eq('usuario_id', usuarioId)
          .eq('room_id', roomId)
          .eq('role_in_room', 'teacher')
          .single()
        
        return { success: true, isTeacher: !!data, error: null }
      } catch (error) {
        return { success: false, isTeacher: false, error }
      }
    }

    async getStudentProgress(usuarioId, roomId) {
      try {
        const timeResult = await this.getRoomTotalTime(roomId, usuarioId)
        const sessionsResult = await this.getAll('usuario_time', {
          usuario_id: usuarioId,
          room_id: roomId
        })
        
        return {
          success: true,
          data: {
            totalTime: timeResult.data,
            sessionCount: sessionsResult.data?.length || 0,
            sessions: sessionsResult.data
          },
          error: null
        }
      } catch (error) {
        console.error('Error getting student progress:', error)
        return { success: false, data: null, error }
      }
    }
}

export default Supabase