/**
 * Generate a random pastel color.
 *
 * @returns {string} A random pastel color in hexadecimal format.
 */
const generateColor = () => {
    // Generate random colors in pastel shades
    const letters = '89ABCDEF';
    const color = `#${Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * letters.length)]).join('')}`;
    return color;
};

/**
 * Generate a mapping of tags to colors for a list of jobs.
 *
 * @param {Array} jobs - The list of jobs with tags.
 * @returns {Object} A mapping of tags to their respective colors.
 */
const getTagColors = (jobs) => {
    const tagColorMap = {};
    jobs.forEach((job) => {
        const tags = job.tags.split(',').map(tag => tag.trim());
        tags.forEach((tag) => {
            if (!tagColorMap[tag]) {
                tagColorMap[tag] = generateColor();
            }
        });
    });
    return tagColorMap;
};

export default getTagColors;