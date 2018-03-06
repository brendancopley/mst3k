<script>
import axios from 'axios'
export default {
  name: 'Customers',
  data () {
    return {
      fields: {
        last_name: { label: 'Name', sortable: true, 'class': 'text-left' },
        email: { label: 'Email', sortable: true, 'class': 'text-left' },
        phone: { label: 'Phone', 'class': 'text-left' },
        created_date: { label: 'Created', sortable: true, 'class': 'text-left' }
      },
      currentPage: 1,
      perPage: 15,
      sortBy: null,
      sortDesc: false,
      filter: null,
      customers: [],
      errors: []
    }
  },
  created () {
    axios.get(`http://localhost:3000/customer/page/1`)
    .then(response => {
      this.customers = response.data.Customers
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  computed: {
    totalRows(){
      return this.customers.length;
    }
  },
  methods: {
    details (index) {
      this.$router.push({
        name: 'ShowCustomer',
        params: { id: index._id }
      })
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Customer List
        <b-link href="#/add-customer">(Add Customer)</b-link>
      </h2>
        <b-form-group class="mb-0">
          <b-input-group>
            <b-form-input type="search" pattern="[^'\x22]+" v-model="filter" placeholder="Type to Search" />
            <b-input-group-button>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-button>
          </b-input-group>
        </b-form-group>
      <b-table striped hover :items="customers" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" @filtered="onFiltered" @row-clicked="details">
        <template slot="last_name" scope="row">
          <span size="sm">{{row.item.first_name | capitalize}} {{row.item.last_name | capitalize}}</span>
        </template>
        <template slot="email" scope="row">
          <span size="sm">{{ row.item.email }}</span>
        </template>
        <template slot="phone" scope="row">
          <span size="sm">{{ row.item.phone }}</span>
        </template>
        <template slot="created_date" scope="row">
          <span size="sm">{{ row.item.created_date | date }}</span>
        </template>
      </b-table>
      <ul v-if="errors && errors.length" class="tableError">
        <li v-for="error of errors">
          {{error.message}}
        </li>
      </ul>
      <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
    </b-col>
  </b-row>
</template>