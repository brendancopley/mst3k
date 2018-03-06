<script>
import axios from 'axios'
export default {
  name: 'ShowCustomer',
  data () {
    return {
      customer: []
    }
  },
  created () {
    axios.get(`http://localhost:3000/customer/` + this.$route.params.id)
    .then(response => {
      this.customer = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    editcustomer (customerid) {
      this.$router.push({
        name: 'EditCustomer',
        params: { id: customerid }
      })
    },
    deletecustomer (customerid) {
      axios.delete('http://localhost:3000/customer/' + customerid)
      .then((result) => {
        this.$router.push({
          name: 'CustomerList'
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>
<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Customer
        <b-link href="#/">(Customer List)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">
          {{customer.first_name | capitalize}} {{customer.last_name | capitalize}}
        </template>
        <template slot="lead">
          Email: {{customer.email}}<br>
          Phone: {{customer.phone}}<br>
        </template>
        <hr class="my-4">
        <p>
          Created Date: {{customer.created_date | date}}
        </p>
        <b-btn variant="success" @click.stop="editcustomer(customer._id)">Edit</b-btn>
        <b-btn variant="danger" @click.stop="deletecustomer(customer._id)">Delete</b-btn>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>