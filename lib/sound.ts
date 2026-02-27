export function playClick() {
    try {
        const audio = new Audio("/typewriter-soft-click.wav");
        const playPromise = audio.play();

        // Play returns a promise in modern browsers
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Ignore autoplay/interaction errors
            });
        }
    } catch (error) {
        // Ignore any synchronous errors
    }
}
