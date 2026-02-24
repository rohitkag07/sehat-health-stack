import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Dashboard() {
    const supabase = await createClient()

    // Get current user session
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch past reports
    const { data: reports, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="flex items-center space-x-2">
                                    <span className="text-2xl">🏥</span>
                                    <span className="text-xl font-bold text-gray-900 tracking-tight">Sehat</span>
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-700">{user.email}</span>
                            <form action="/auth/logout" method="post">
                                <button
                                    type="submit"
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                >
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="md:flex md:items-center md:justify-between mb-8">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                            My Blood Reports
                        </h2>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4">
                        <Link
                            href="/upload"
                            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Upload New Report
                        </Link>
                    </div>
                </div>

                {error && (
                    <div className="rounded-md bg-red-50 p-4 mb-6">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Error loading reports</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <p>{error.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    {!reports || reports.length === 0 ? (
                        <div className="text-center py-12">
                            <span className="text-4xl">📄</span>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No reports found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                You haven't uploaded any blood reports yet.
                            </p>
                            <div className="mt-6">
                                <Link
                                    href="/upload"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Upload your first report
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <ul role="list" className="divide-y divide-gray-200">
                            {reports.map((report) => {
                                const urgencyColor =
                                    report.analysis?.urgency === 'critical' ? 'bg-red-100 text-red-800' :
                                        report.analysis?.urgency === 'high' ? 'bg-orange-100 text-orange-800' :
                                            report.analysis?.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-green-100 text-green-800';

                                return (
                                    <li key={report.id}>
                                        <Link href={`/report/${report.id}`} className="block hover:bg-gray-50">
                                            <div className="px-4 py-4 sm:px-6">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-blue-600 truncate">
                                                        {report.patient_name || 'Unknown Patient'} • {report.test_date ? new Date(report.test_date).toLocaleDateString() : 'Unknown Date'}
                                                    </p>
                                                    <div className="ml-2 flex-shrink-0 flex">
                                                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${urgencyColor}`}>
                                                            {report.analysis?.urgency?.toUpperCase() || 'UNKNOWN'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-2 sm:flex sm:justify-between">
                                                    <div className="sm:flex">
                                                        <p className="flex items-center text-sm text-gray-500">
                                                            <span className="truncate">{report.analysis?.overallStatus || 'No status available'}</span>
                                                        </p>
                                                    </div>
                                                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                        <p>
                                                            Uploaded on {new Date(report.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    )
}
