a = [[1,2],[3,4],[5,6]];

a.some(el => {
	console.log(el);
	const index = el.indexOf(3);
	if (index >= 0) {
        el.splice(index, 1)
        return true;
    }
})
console.log(a)