import { RestaurentService } from './../../../services/restaurent.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestaurentModel } from 'src/app/models/restaurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.scss'],
})
export class RestaurentDashComponent {
  formValue!: FormGroup;
  restaurentModelObj!: RestaurentModel;
  allRestaurentData: any;
  showAdd!: boolean;
  showBtn!: boolean;

  constructor(
    private formbuilder: FormBuilder,
    private api: RestaurentService
  ) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
    });
    this.getAllData();
  }
  clickAddResto() {
    this.formValue.reset();
    this.showAdd = true;
    this.showBtn = false;
  }

  addRestaurent() {
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.postRestaurent(this.restaurentModelObj).subscribe({
      next: (res) => {
        console.log(res);
        alert('Restaurent Added Successfully');
        this.formValue.reset();

        let ref = document.getElementById('close');
        ref?.click();

        this.getAllData();
      },
      error: (err) => {
        console.log(err);
        alert('Restaurent Added Failed!');
      },
    });
  }

  getAllData() {
    this.api.getRestaurent().subscribe({
      next: (res) => {
        this.allRestaurentData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteResto(data: any) {
    this.api.deleteRestaurant(data).subscribe({
      next: (res: any) => {
        alert('Restaurent Deleted Successfully');
        this.getAllData();
      },
    });
  }
  onEditResto(data: any) {
    this.showAdd = false;
    this.showBtn = true;

    this.api.getRestaurantById(data.id).subscribe(
      (res: any) => {
        this.restaurentModelObj = res;
       // Assign the entire response to the model object
        this.formValue.patchValue(res); // Use patchValue to populate the form
      },
      (error: any) => {
        console.error('Error fetching restaurant details:', error);
      }
    );
  }

  updateResto() {
    // Check if the 'id' property is available in 'restaurentModelObj'
    if (!this.restaurentModelObj.id) {
      console.error("'id' is missing in restaurentModelObj.");
      return; // Exit the function early
    }
  
    // Update other properties from the form
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;
  
    // Perform the update
    this.api.updateRestaurant(this.restaurentModelObj.id, this.restaurentModelObj).subscribe(
      () => {
        alert('Restaurant Updated Successfully');
        this.formValue.reset();
        let ref = document.getElementById('close');
        if (ref) {
          ref.click();
        }
        this.getAllData(); // Make sure this function is defined
      },
      (error: any) => {
        console.error('Error updating restaurant:', error);
      }
    );
  }
  
}
