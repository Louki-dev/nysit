(function () {

    $(document).ready(function (e) {

        // PRELOAD 
        gsap.to('#loader',{ delay: 3.6, opacity: 0, ease: "power2.inOut",
            onComplete: function () {
                document.getElementById('area').classList.remove("hide");
                document.getElementById('loader').classList.add("hide");
            }
        });
        

        // TYPE ANIMATION
        const words = ['ENJOY', 'NOW YOU SEE IT', 'FOCUS', 'LEARN', 'PRACTICE']; //array of words to display

        let cursor = gsap.to('.cursor', {opacity: 0, ease:"power2.inOut", repeat: -1}) // cursor fade effect
        
        let timeline = gsap.timeline({repeat: -1}) // repeat the index from array

        words.forEach(word => {
            
            let word_tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 }) // animating the words
            word_tl.to('.text', { duration: 1, text: word }) // display each letter

            timeline.add(word_tl) // append the words to timeline
        })

    });

})();
