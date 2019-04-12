const timings = [
    0,
    2,
    12,
    24,
    3 * 24,
    7 * 24,
    14 * 24,
    30 * 24,
    3 * 30 * 24,
    6 * 30 * 24
]

export const scheduleNextReview = (box: number) => {
    return box >= timings.length ? new Date(8640000000000000) : new Date(new Date().getTime() + timings[box] * 60 * 60 * 1000)
}
