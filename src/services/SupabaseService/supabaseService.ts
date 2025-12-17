import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase enviornment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)


const uploadDogPhoto = async (file: File, dogId: string): Promise<string> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${dogId}-${Date.now()}.${fileExt}`


    const { error: uploadError } = await supabase.storage
        .from('dog-photos')
        .upload(fileName, file, {
        })

    if (uploadError) {
        console.error('Supabase upload error:', uploadError)
        throw new Error(`Failed to upload photo: ${uploadError.message}`)

    }

    const { data } = supabase.storage
        .from('dog-photos')
        .getPublicUrl(fileName)

    return data.publicUrl
}

export { supabase, uploadDogPhoto }

