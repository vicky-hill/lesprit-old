import React from 'react';

function Overview() {
    return (
        <div className='table-container'>
            <table className='table sticky'>
                <thead>
                    <tr>
                        <th>Spanish</th>
                        <th>English</th>
                        <th>Rating</th>
                        <th>Due</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>loco</strong></td>
                        <td>crazy</td>
                        <td>5</td>
                        <td>2h</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Overview;
