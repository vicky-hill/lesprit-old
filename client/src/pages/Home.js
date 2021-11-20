import React, { useEffect, useState } from 'react';
import Circle from '../components/home/Circle';
import { Link } from 'react-router-dom';
import MenuCard from '../components/home/MenuCard';
import Slide from '../components/elements/Slide';
import Review from '../components/home/Review';
import reviewSelector from 'selectors/reviewSelector'

import speechbubble from '../assets/iconsImg/speechbubble-icon.png';
import book from '../assets/iconsImg/book-icon.png';
import Footer from '../components/elements/Footer';
import Container from '../components/containers/Container';
import Spinner from 'components/elements/Spinner';

import { connect } from 'react-redux';
import { getWords, updateWord } from 'actions/words';
import { getLists } from 'actions/lists';
import { openSlide, closeSlide } from 'actions/utils'

function Home({
    getWords,
    updateWord,
    getLists,
    openSlide,
    closeSlide,
    loading,
    wordCount,
    review
}) {

    const windowClass = window.innerWidth < 1100 ? 'mobile' : 'desktop';

    useEffect(() => {
        getWords();
        getLists();
        // eslint-disable-next-line
    }, [])

    const [reviewMode, setReviewMode] = useState(false);

    const openReview = () => {
        setReviewMode(true);
        openSlide();
    }

    const closeReview = () => {
        setReviewMode(false);
        closeSlide();
    }

    return (
        <Container>
            {
                loading ? <Spinner /> : (
                    <>
                        {/* Landing page */}
                        <div className={windowClass + '-home'}>
                            <Circle
                                windowClass={windowClass}
                                review={review}
                                onClick={review.length ? openReview : null}
                                count={wordCount}
                            />

                            {/* Menu items for desktop */}
                            {
                                windowClass === 'desktop' && (
                                    <div className="desktop-home_menu">
                                        <Link to="/vocabulary">
                                            <MenuCard icon={book} title="Vocabulary" />
                                        </Link>
                                        <Link to="/conjugation">
                                            <MenuCard icon={speechbubble} title="Conjugation" bigger />
                                        </Link>
                                    </div>
                                )
                            }

                            {/* Footer for mobile */}
                            <Footer />
                        </div>

                        {/* Review Page */}
                        <Slide >
                            <Review review={reviewMode} updateWord={updateWord} words={review} close={closeReview} />
                        </Slide>
                    </>
                )
            }

        </Container >

    )
}

const mapStateToProps = state => ({
    wordCount: state.words.words.length,
    loading: state.words.loading,
    review: reviewSelector(state)
})

export default connect(mapStateToProps, { getWords, getLists, openSlide, closeSlide, updateWord })(Home);
