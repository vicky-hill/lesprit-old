import React, { useState, useRef, useEffect } from 'react';

function WordTextarea() {

    const containerRef = useRef(null);
    const backdropRef = useRef(null);
    const highlightsRef = useRef(null);
    const textareaRef = useRef(null);


    const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam minima deleniti laudantium esse! Rerum earum ipsum debitis itaque dolor, quibusdam voluptates dolorem optio. Dolorum asperiores quis hic cumque! Ipsa, fuga? Similique optio dolorum, officiis cupiditate sit ipsa consequatur modi perferendis atque architecto alias pariatur, quaerat tempora omnis saepe? Unde, autem. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit deleniti nemo numquam labore vero, nobis rem quasi facilis, odit dolorum voluptatem inventore harum possimus? Iusto consequatur eaque voluptatibus quisquam, cumque eos laborum neque quasi ad voluptatum aperiam repudiandae magni atque, dolor sapiente veniam nostrum autem officiis, labore eius dolore. Sint et dicta dignissimos ipsa itaque, officia dolor explicabo ab ducimus doloremque enim, rem neque nihil quos. Reprehenderit molestias veritatis, officia eligendi repellendus ipsam numquam repellat excepturi totam voluptatem tenetur cupiditate? Alias voluptates quidem cum harum maiores eligendi sed quaerat recusandae dolorem, qui assumenda ea nam voluptas corporis debitis consequuntur veniam?'

    const [value, setValue] = useState(lorem);
    const [highlight, setHighlight] = useState('Lorem');
    const [highlightedText, setHighlightedText] = useState('');

    const onChange = (e) => {
        setValue(e.target.value);
    }

    function handleInput() {
        const highlightedText = applyHighlights(value);
        highlightsRef.current.innerHTML = highlightedText;
    }


    function applyHighlights(text) {
        const seg1 = value.split(highlight)[0];
        const seg2 = value.split(highlight)[1];
        
        text = `${seg1}<mark>${highlight}</mark>${seg2}`;

        return text;
    }

    const getHighlight = () => {
        const getText = window.getSelection().toString();

        if (getText) {
            setHighlight(getText)
        }

        handleInput();
    }

    useEffect(() => {
        handleInput();
    }, [])

    function handleScroll() {
        const scrollTop = textareaRef.current.scrollTop;
        backdropRef.current.scrollTop = scrollTop;
    }

    // yeah, browser sniffing sucks, but there are browser-specific quirks to handle that are not a matter of feature detection
    // var ua = window.navigator.userAgent.toLowerCase();
    // var isIE = !!ua.match(/msie|trident\/7|edge/);
    // var isWinPhone = ua.indexOf('windows phone') !== -1;
    // var isIOS = !isWinPhone && !!ua.match(/ipad|iphone|ipod/);

    // function applyHighlights(text) {
    //     text = text
    //         .replace(/\n$/g, '\n\n')
    //         .replace(/[A-Z].*?\b/g, '<mark>$&</mark>');

    //     if (isIE) {
    //         // IE wraps whitespace differently in a div vs textarea, this fixes it
    //         text = text.replace(/ /g, ' <wbr>');
    //     }

    //     return text;
    // }

    // function handleInput() {
    //     var text = $textarea.val();
    //     var highlightedText = applyHighlights(text);
    //     $highlights.html(highlightedText);
    // }

    // function handleScroll() {
    //     var scrollTop = $textarea.scrollTop();
    //     $backdrop.scrollTop(scrollTop);

    //     var scrollLeft = $textarea.scrollLeft();
    //     $backdrop.scrollLeft(scrollLeft);
    // }

    // function fixIOS() {
    //     // iOS adds 3px of (unremovable) padding to the left and right of a textarea, so adjust highlights div to match
    //     $highlights.css({
    //         'padding-left': '+=3px',
    //         'padding-right': '+=3px'
    //     });
    // }

    // function bindEvents() {
    //     $textarea.on({
    //         'input': handleInput,
    //         'scroll': handleScroll
    //     });

    //     $toggle.on('click', function () {
    //         $container.toggleClass('perspective');
    //     });
    // }

    // if (isIOS) {
    //     fixIOS();
    // }

    // bindEvents();
    // handleInput();


    return (
        <div style={{ marginTop: '50px' }}>
            <div className='phrase-edit_container' ref={containerRef}>
                <div className="phrase-edit_backdrop" ref={backdropRef}>
                    <div className="phrase-edit_highlights" ref={highlightsRef}></div>
                </div>
                <textarea
                    ref={textareaRef}
                    className='phrase-edit_textarea'
                    name="phrase"
                    id="phrase"
                    placeholder="Phrase"
                    value={value}
                    onChange={onChange}
                    onMouseUp={getHighlight}
                    onScroll={handleScroll}
                />
            </div>
        </div>
    );
}

export default WordTextarea;
