<template lang="html">
  <div class="wrapper" v-if="$v">
    <div class="content">
      <div class="contact">
        <b-container>
          <b-row>
            <b-col md="3" offset="4">
              <img src="../assets/images/_Contact_Icon_.png" alt="Contact Icon" class="logo">
            </b-col>
          </b-row>
          <b-row>
            <b-col md="12">
              <b-form @submit="onSubmit" v-if="show">
                <b-row align-h="between">
                  <b-col md="5">
                    <b-form-group
                        id="input-group-1"
                        label="Имя"
                        label-class="red-star"
                        label-for="input-1">
                      <b-form-input
                          class="custom-input"
                          id="input-1"
                          v-model="form.name">
                      </b-form-input>
                      <div class="error" v-if="showErrorName && !$v.form.name.required">Введите ваше имя</div>
                      <div class="error" v-if="showErrorName && !$v.form.name.alpha">Имя должно содержать только буквы
                      </div>
                      <div class="error" v-if="showErrorName && !$v.form.name.minLength">Имя должно содержать не менее
                        {{$v.form.name.$params.minLength.min}} символов.
                      </div>
                      <div class="error" v-if="showErrorName && !$v.form.name.maxLength">Имя не должно превышать
                        {{$v.form.name.$params.maxLength.max}} символов.
                      </div>
                    </b-form-group>

                    <b-form-group
                        id="input-group-2"
                        label="E-mail"
                        label-class="red-star"
                        label-for="input-2">
                      <b-form-input
                          class="custom-input"
                          id="input-2"
                          v-model="form.email">
                      </b-form-input>
                      <div class="error" v-if="showErrorEmail && !$v.form.email.required">Введите ваш email</div>
                      <div class="error" v-if="showErrorEmail && !$v.form.email.type">Введите корректный email</div>
                    </b-form-group>
                  </b-col>

                  <b-col md="5">
                    <b-form-group
                        id="input-group-3"
                        label="Комментарий"
                        label-class="red-star"
                        label-for="textarea">
                      <b-form-textarea
                          class="custom-input"
                          id="textarea"
                          v-model="form.text"
                          rows="5"
                          max-rows="5">
                      </b-form-textarea>
                      <div class="error" v-if="showErrorText && !$v.form.text.required">Введите комментарий</div>
                      <div class="error" v-if="showErrorText && !$v.form.text.minLength">Комментарий должен содержать не
                        менее {{$v.form.text.$params.minLength.min}} символов.
                      </div>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row align-h="end">
                  <b-col md="3" class="d-flex">
                    <b-button block type="submit" class="submit-btn">Записать</b-button>
                  </b-col>
                </b-row>
              </b-form>
            </b-col>
          </b-row>

        </b-container>
      </div>

      <div class="comments">
        <b-container>
          <b-row>
            <b-col>
              <h2>Комментарии</h2>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="4" class="card-container" v-for="item in this.comments" :key=item.id
                   @click="openCardDetails(item.id)">
              <b-card border-variant="light" :header=item.name class="text-center">
                <b-card-text>{{item.email}}</b-card-text>
                <b-card-text>{{item.text}}</b-card-text>
              </b-card>
            </b-col>
          </b-row>
        </b-container>

      </div>
    </div>
    <div class="footer">
      <b-container>
        <b-row class="justify-content-end">
          <b-col md="2" class="d-flex align-items-center justify-content-end">
            <a href="">
              <img src="../assets/images/vk.png" alt="VK Icon" class="social">
            </a>
            <a href="">
              <img src="../assets/images/fb.png" alt="FB Icon" class="social">
            </a>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
	import { mapState, mapActions, mapGetters } from 'vuex'
	import formValidation from "../validations/validation";

	export default {
		name: 'Home',
		components: {
			Comment
		},
		validations: formValidation,
		data() {
			return {
				form: {
					email: '',
					name: '',
					text: '',
					id: this.getNextId()
				},
				show: true,
				showErrorName: false,
				showErrorEmail: false,
				showErrorText: false
			}
		},
		methods: {
			onSubmit(evt) {
				this.$v.form.$touch();
				evt.preventDefault();
				if (this.$v.form.name.$invalid) {
					this.showErrorName = true;

				}
				if (this.$v.form.email.$invalid) {
					this.showErrorEmail = true;
				}
				if (this.$v.form.text.$invalid) {
					this.showErrorText = true;
				}
				if (this.$v.form.$invalid) {
					return
				}
				this.form.id += 1;
				this.addComment({...this.form});
				this.resetForm();
			},
			resetForm() {
				this.form.email = '';
				this.form.name = '';
				this.form.text = '';
				this.show = false;
				this.showErrorName = false;
				this.showErrorEmail = false;
				this.showErrorText = false;
				this.$nextTick(() => {
					this.show = true
				})
			},
			...mapActions([
				"addComment"
			]),
			...mapGetters([
				'getNextId'
			]),
			openCardDetails(id) {
				this.$router.push({path: `/comment/${id}`})
			}
		},
		watch: {
			'form.name'() {
				if (this.$v.form.name.$invalid) {
					this.showErrorName = true;
				}
				this.$v.form.name.$touch()
			},
			'form.email'() {
				if (this.$v.form.email.$invalid) {
					this.showErrorEmail = true;
				}
				this.$v.form.email.$touch()
			},
			'form.text'() {
				if (this.$v.form.text.$invalid) {
					this.showErrorText = true;
				}
				this.$v.form.text.$touch()
			}
		},
		computed: {
			...mapState([
				'comments'
			])
		}
	}
</script>

<style lang="scss">
  .wrapper {
    height: 100%;
  }

  .content {
    box-sizing: border-box;
    min-height: 100%;
    padding-bottom: 90px;
  }

  .footer {
    height: 80px;
    margin-top: -80px;
    background-color: #313439;
    display: flex;
    align-items: center;

    .social {
      min-width: 25px;
      width: 2.94vw;
      margin: 10px;
      cursor: pointer;
    }
  }

  .contact {
    background-color: #313439;

    .container {
      padding-top: 12.35vh;
      padding-bottom: 5.83vw;
    }

    .logo {
      width: 16vw;
    }

    label {
      color: #d7d7d7;
    }

    .red-star:after {
      content: " *";
      color: red;
    }

    textarea {
      resize: none;
    }

    .custom-input {
      font-family: Roboto, sans-serif;
      font-size: 16px;
      font-weight: 500;
      color: #d7d7d7;
      border: 1px solid rgba(255, 255, 255, 0.52);
      background-color: #2f3136;

      &:focus {
        border: 1px solid rgba(190, 57, 59, 0.49);
        box-shadow: none;
      }
    }

    .submit-btn {
      display: flex;
      justify-content: center;
      margin-top: 6.51vw;
      width: 100%;
      height: 60px;
      background-color: #be393b;
      font-weight: 700;
      border: none;
      border-radius: 0;
    }

    .error {
      color: red;
      font-family: Roboto, sans-serif;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .comments {
    h2 {
      padding-top: 8.7vw;
      padding-bottom: 7.11vw;
      text-align: center;
    }

    .card-container {
      cursor: pointer;
      font-family: Roboto, sans-serif;

      .card {
        margin: 0 auto 15px;
        max-width: 215px;
        border: none;
        border-radius: 0;
      }


      .card-body {
        box-sizing: border-box;
        min-height: 215px;
        background-color: #E9EDF3;
      }
    }

    .card-container:nth-child(odd) {
      .card-header {
        background-color: #4b596c;
        color: #ffffff;
      }
    }

    .card-container:nth-child(even) {
      .card-header {
        background-color: #58ad52;
        color: #ffffff;
      }

      .card-body .card-text:first-child {
        color: #58ad52;
      }
    }

    .card-container {
      .card-body .card-text {
        margin-bottom: 2rem;
      }
    }
  }

</style>