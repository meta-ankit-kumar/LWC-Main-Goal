export const useTemplate = (templateString, params) => {
	Object.entries(params).forEach(item => {
		templateString = templateString.replace(item[0].toUpperCase(), item[1])
	})
	return templateString;
}