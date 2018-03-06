<script>
window.app.cc = this
import axios from 'axios'
export default {
  name: 'CreateCustomer',
  data () {
    return {
      customer: {},
      errorModal: false,
      successModal: false,
      invalidModal: false,
      errors: {}
    }
  },
  computed: {
    firstNameState () {
      if(this.customer.first_name !== undefined){
        return this.customer.first_name.length > 2 ? true : false
      }
      else{
        return false
      }
    },
    lastNameState () {
      if(this.customer.last_name !== undefined){
        return this.customer.last_name.length > 2 ? true : false
      }
      else{
        return false
      }
    },
    emailState () {
      if(this.customer.email !== undefined){
        return this.customer.email.length > 2 ? true : false
      }
      else{
        return false
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      if(this.customer.first_name !== undefined && this.customer.first_name.length > 2 && this.customer.last_name !== undefined && this.customer.last_name.length > 2 && this.customer.email !== undefined && this.customer.email.length > 2){
      axios.post(`http://localhost:3000/customer`, this.customer)
      .then(response => {
        this.invalidModal = false;
        this.errorModal = false; 
        this.successModal = true;
        console.log(response);
        this.$router.push({
          name: 'ShowCustomer',
          params: { id: response.data._id }
        })
      })
      .catch(e => {
        console.log(e);
        if(e.response.status == 500){
          this.invalidModal = true;
          this.errorModal = false; 
        }
        else if(e.response.status == 400){
          this.invalidModal = false;
          this.errorModal = true;
        }
        else if(e.response.status == 201){
          this.invalidModal = false;
          this.errorModal = true;
        }
        else{
          this.invalidModal = false;
          this.errorModal = true;
        }
        this.errors.push(e);
      })
    }
    else{
      this.errorModal = true;
    }
    }
  }
}
</script>
<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Add Customer
        <b-link href="#/">(Customer List)</b-link>
      </h2>
      <b-form @submit="onSubmit" class="newCustomer">
      <div v-if="errorModal" ref="errorModal" title="Error">
        <div class="errorMessage d-block text-center">
          <h3>Please fill out all the required fields!</h3>
        </div>
      </div>
      <div v-if="invalidModal" ref="invalidModal" title="Invalid">
        <div class="errorMessage d-block text-center">
          <h3>Invalid entry, possible duplicate entry!</h3>
        </div>
      </div>
      <div v-if="successModal" ref="successModal" title="Success">
        <div class="successMessage d-block text-center">
          <h3>The customer has been successfully created!</h3>
        </div>
      </div>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Name">
          <b-form-input maxlength="30" pattern="[^'\x22]+" type="text" id="first_name" :state="firstNameState" aria-describedby="inputLiveHelp inputLiveFeedback" placeholder="Enter the customer's first name" v-model.trim="customer.first_name"></b-form-input>
          <b-form-input maxlength="30" pattern="[^'\x22]+" type="text" id="last_name" :state="lastNameState" aria-describedby="inputLiveHelp inputLiveFeedback" placeholder="Enter the customer's last name" v-model.trim="customer.last_name"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Email">
          <b-form-input maxlength="50" pattern="[^'\x22]+" type="email" id="email" :state="emailState" aria-describedby="inputLiveHelp inputLiveFeedback" placeholder="Enter the customer's email" v-model.trim="customer.email"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Phone #">
          <b-form-input maxlength="20" pattern="[^'\x22]+" type="tel" id="phone" placeholder="Enter the customer's phone # (optional)" :state="state" v-model.trim="customer.phone"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Save</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>