import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Customer } from './customer.model';
import { Observable } from 'rxjs';
const headerOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json'
    })
}

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    url ='http://localhost:3000/customers';

    constructor(private  readonly http: HttpClient) {
    }
    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.url, headerOptions);
    }

    getCustomerById(id: number): Observable<Customer> {
       return this.http.get<Customer>(this.url + '/' + id, headerOptions);
    }

    createCustomer(customer: Customer): Observable<Customer> {
        return this.http.post<Customer>(this.url, {customer}, headerOptions);
    }

    updateCustomer(customer: Customer): Observable<Customer> {
        const cust = {
         id: customer.id,
         name: customer.name,
         phone: customer.phone,
         address: customer.address,
         membership: customer.membership,
        };
        return this.http.put<Customer>(this.url + '/' + customer.id, cust, headerOptions);
    }

    deleteCustomer(id: number): Observable<Customer> {
        return this.http.delete<Customer>(this.url + '/' + id, headerOptions);
    }
}