export const validateInput = (...validationObjects) => {
	let valid = true;
	let errors = [];
	validationObjects.forEach((obj) => {
		const input = obj.input;
		if (!obj.validators) return;
		obj.validators.forEach((v) => {
			switch (v.name) {
				case 'required':
					const requiredResult = requiredValidator(input);
					if (!requiredResult) {
						errors.push({ field: obj.field, message: 'Please fill out this field.' });
						valid = false;
					}
					break;
				case 'maxlength':
					const maxlengthResult = maxlengthValidator(input, v.args);
					if (!maxlengthResult) {
						errors.push({
							field: obj.field,
							message: `Maximum length ${v.args}, you have ${input.length}.`
						});
						valid = false;
					}
					break;
				case 'minlength':
					const minlengthResult = minlengthValidator(input, v.args);
					if (!minlengthResult) {
						errors.push({
							field: obj.field,
							message: `Minimum length ${v.args}, you have ${input.length}.`
						});
						valid = false;
					}
					break;
				case 'choice':
					const choiceResult = requiredValidator(input);
					if (!choiceResult) {
						errors.push({
							field: obj.field,
							message: `Please select an option.`
						});
						valid = false;
					}
					break;
				default:
					break;
			}
		});
	});
	return [valid, errors];
};

const requiredValidator = (input) => {
	if (input.length === 0) return false;
	return true;
};

const maxlengthValidator = (input, length) => {
	if (input.length > length) return false;
	return true;
};

const minlengthValidator = (input, length) => {
	if (input.length < length) return false;
	return true;
};
