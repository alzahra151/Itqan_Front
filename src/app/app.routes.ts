import { Routes } from '@angular/router';
import { LayoutComponent } from './components/mainLayout/layout/layout.component';
import { HomeComponent } from './components/mainLayout/home/home.component';
import { AddAssociationComponent } from './components/add-association/add-association.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddStratgyPlanComponent } from './components/add-stratgy-plan/add-stratgy-plan.component';
import { AddExecutivePlanComponent } from './components/add-executive-plan/add-executive-plan.component';
import { AddAdministrationComponent } from './components/add-administration/add-administration.component';
import { AdministrationsComponent } from './components/administrations/administrations.component';
import { StrategicPlanDetailsComponent } from './components/strategic-plan-details/strategic-plan-details.component';
import { StrategicPlansComponent } from './components/strategic-plans/strategic-plans.component';
import { ExecutivePlansComponent } from './components/executive-plans/executive-plans.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent, // this is the component with the <router-outlet> in the template
        children: [
            {
                path: '', // child route path
                component: HomeComponent, // child route component that the router renders
            },
            {
                path: 'add-association',
                component: AddAssociationComponent, // another child route component that the router renders
            },
            {
                path: 'add-employee',
                component: AddEmployeeComponent, // another child route component that the router renders
            },
            {
                path: 'add-stratgy-plan',
                component: AddStratgyPlanComponent, // another child route component that the router renders
            },
            {
                path: 'add-executive-plan/:id',
                component: AddExecutivePlanComponent, // another child route component that the router renders
            },
            {
                path: 'add-administration',
                component: AddAdministrationComponent, // another child route component that the router renders
            },
            {
                path: 'administrations',
                component: AdministrationsComponent, // another child route component that the router renders
            },
            {
                path: 'plans',
                component: StrategicPlansComponent, // another child route component that the router renders
            },
            {
                path: 'plans/:id',
                component: StrategicPlanDetailsComponent, // another child route component that the router renders
            },
            {
                path: 'executive_plans/:id',
                component: ExecutivePlansComponent, // another child route component that the router renders
            },
        ],
    },
];
