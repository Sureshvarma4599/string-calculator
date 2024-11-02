export const Table = ({ data }:any) => {
    return (
        <table className="min-w-full divide-y divide-gray-300">

            <thead>
            <tr>
                <th scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    S.No
                </th>
                <th scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                    Input
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Output
                </th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {data && data?.length> 0 ?data.slice(0, 10).map((entry, index) => (
                <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-0">
                        {index + 1}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                        {entry.input}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entry.output}</td>
                </tr>)): null}
            </tbody>

        </table>
    )
}

