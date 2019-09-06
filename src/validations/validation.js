import { required, minLength, maxLength, email, helpers} from 'vuelidate/lib/validators'

const alpha = helpers.regex('alphaCyrillic', /^[а-яА-ЯA-z]*$/);
const formValidation = () => {
	const config = {
		form: {
			name: {
				required,
				minLength: minLength(3),
				maxLength: maxLength(16),
				alpha: alpha
			},
			email: {
				required,
				type: email
			},
			text: {
				required,
				minLength: minLength(30)
			}
		}
	};

	return config;
};

export default formValidation