import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getWords, sortWords } from 'actions/words';


function Overview({ words, loading, getWords, sortWords, rerender }) {
    
    useEffect(() => {
        getWords();
    }, [])

    useEffect(() => {
        console.log('rerender');
    }, [rerender]);


    function getTime(date) {
        const countDate = new Date(date);
        const now = new Date().getTime();
        const gap = countDate - now;

        if (gap <= 0) {
            return "--";
        }

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const d = Math.floor(gap / (day));
        const h = Math.floor(gap % (day) / hour);
        const m = Math.floor(gap % (hour) / minute);


        const result = `${d}d, ${h}h, ${m}m`;

        return result;
    }



    return (
        <div className='table-container'>
            <table className='table sticky'>
                <thead>
                    <tr>
                        <th>Spanish</th>
                        <th>English</th>
                        <th onClick={() => sortWords('rating')}>Rating</th>
                        <th onClick={() => sortWords('date')}>Due</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !loading && words.map(word => (
                            <tr key={word._id}>
                                <td><strong>{word.foreign}</strong></td>
                                <td>{word.native}</td>
                                <td>{word.rating}</td>
                                <td>{getTime(word.dueDate)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = state => ({
    words: state.words.words,
    loading: state.words.loading,
    rerender: state.words.rerender
})

export default connect(mapStateToProps, { getWords, sortWords })(Overview);
