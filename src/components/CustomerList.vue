<script>
import axios from 'axios'
export default {
  name: 'CustomerList',
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
      TotalCustomers: 1,
      sortedBy: 'created_date',
      errors: []
    }
  },
  created () {
    axios.get(`http://localhost:3000/customer/get/created_date/ascending/1`)
    .then(response => {
      this.customers = response.data.Customers
      this.TotalCustomers = response.data.TotalCustomers
      this.totalRows = response.data.customers.length
      this.sortedBy = response.data.SortedBy
      this.currentPage = response.data.CurrentPage
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  computed: {
    filteredList() {
      if(this.filter !== null){
        if(this.filter.length > 0){
          axios.get('http://localhost:3000/customer/find/' + this.filter)
          .then(response => {
            this.customers = response.data.Customers
            this.TotalCustomers = response.data.TotalCustomers
            this.totalRows = response.data.customers.length
            return this.customers
          })
          .catch(e => {
            this.errors.push(e)
          })
        }
        else{
          return this.customers
        }
      }
      else{
        return this.customers
      }
    },
    consoleError(){
      if(errors.length > 0){
        console.log(errors);
      }
    },
    totalRows(){
      return this.TotalCustomers;
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
      if(this.filter !== null){
        if(this.filter.length == 0){
          this.sortingChanged(1)
        }
        else{
          this.totalRows = filteredItems.length
        }
      }
    },
    sortingChanged (ctx) {
      console.log('text sort ', ctx);
      if(ctx.sortDesc == true){
        var sortDirection = 'descending'
      }
      else{
        var sortDirection = 'ascending'
      }
      if(ctx.sortBy !== undefined){
        this.sortedBy = ctx.sortBy;
      }
      if(ctx.currentPage !== undefined){
        this.currentPage = ctx.currentPage;
      }
      else{
        this.currentPage = ctx;
      }
      console.log('test '+ this.sortedBy + '/' + sortDirection + '/' + this.currentPage);
      axios.get('http://localhost:3000/customer/get/' + this.sortedBy + '/' + sortDirection + '/' + this.currentPage)
      .then(response => {
        console.log('test response ', response);
        this.customers = response.data.Customers
        this.TotalCustomers = response.data.TotalCustomers
        this.totalRows = response.data.customers.length
      })
      .catch(e => {
        this.errors.push(e)
      })
    // ctx.sortBy   ==> Field key for sorting by (or null for no sorting)
    // ctx.sortDesc ==> true if sorting descending, false otherwise
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
            <b-form-input type="search" pattern="[^'\x22]+" v-model="filter" @change="filteredList" placeholder="Type to Search" />
            <b-input-group-button>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-button>
          </b-input-group>
        </b-form-group>
      <b-table striped hover :items="customers" :fields="fields" :filter="filter" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" @filtered="onFiltered" @row-clicked="details" @sort-changed="sortingChanged">
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
      <b-pagination :total-rows="totalRows" :per-page="perPage" @change="sortingChanged" v-model="currentPage" class="my-0" />
    </b-col>
  </b-row>
</template>