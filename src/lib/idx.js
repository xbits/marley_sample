//Utility method to safely access deeply nested properties
// p - Properties array
// o - The object to be accessed
const idx = (p, o) => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o);

export default idx;