// Test Supabase Connection
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
config({ path: path.join(__dirname, '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Testing Supabase Connection...')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'MISSING')

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  try {
    // Test: Try to fetch from labs table
    const { data, error } = await supabase
      .from('labs')
      .select('*')
      .limit(5)
    
    if (error) {
      console.error('❌ Query failed:', error.message)
      console.log('\n📝 Troubleshooting:')
      console.log('1. Check if Supabase project is active')
      console.log('2. Verify API keys in .env.local')
      console.log('3. Run schema.sql in Supabase SQL Editor')
      console.log('4. Check RLS policies')
      return
    }
    
    console.log('\n✅ SUCCESS! Supabase connected!')
    console.log(`📊 Found ${data.length} labs in database`)
    
    if (data.length > 0) {
      console.log('\n📋 Sample labs:')
      data.forEach((lab, i) => {
        console.log(`   ${i + 1}. ${lab.name} - ${lab.area || lab.city}`)
      })
    } else {
      console.log('\n⚠️  No labs found. Run the initial data insertion from schema.sql')
    }
    
  } catch (err) {
    console.error('❌ Connection failed:', err.message)
  }
}

testConnection()
