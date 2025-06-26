import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Form } from './form/form';

const routes: Routes = [{ path: '', component: Form }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidatorRoutingModule {}
