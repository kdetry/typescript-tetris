export const CalculateScore = (line: number) => {
    let score: number = 0;
    switch (line) {
        case 2:
            score = 300;
            break;
        case 3:
            score = 500;
            break;
        case 4:
            score = 800;
            break
        default:
            score = 100;
            break;
    }
    return score;
}