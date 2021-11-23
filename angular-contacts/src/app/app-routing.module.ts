import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth-guard.service'
import {LayoutComponent} from './layout/layout.component'
import {ContactListComponent} from './contact-list/contact-list.component'
import {ContactNewComponent} from './contact-new/contact-new.component'
import {ContactEditComponent} from './contact-edit/contact-edit.component'

import {TagListComponent} from './tag-list/tag-list.component'
import {TagNewComponent} from './tag-new/tag-new.component'
import {TagEditComponent} from './tag-edit/tag-edit.component'

import {SigninComponent} from './signin/signin.component'
import {SignupComponent} from './signup/signup.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/contacts', // 当请求根路径的时候，跳转到 contacts 联系人组件
    pathMatch: 'full' // 必须完全匹配到路径的时候才做重定向
  },
  {
    path: 'layout',
    component: LayoutComponent
  },
  {
    path: 'contacts',
    component: LayoutComponent,
    canActivate: [AuthGuard], // 在导航 contacts 之前会先进入路由守卫
    children:[
      {
        path:'',
        component:ContactListComponent
      },
      {
        path:'new',
        component:ContactNewComponent
      },
      {
        path:'edit/:id',
        component:ContactEditComponent
      },
    ]
  },
  {
    path: 'tags',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path:'',
        component:TagListComponent
      },
      {
        path:'new',
        component:TagNewComponent
      },
      {
        path:'edit',
        component:TagEditComponent
      },
    ]
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
