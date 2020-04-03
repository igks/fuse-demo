import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DepartmentReportResolver } from "app/resolvers/department-resolver";
import { DepartmentService } from "app/services/department.service";
import { AuthGuard } from "app/guards/auth.guard";
import { DepartmentReportComponent } from "./department-report/department-report.component";
const routes: Routes = [
    {
        path: "pages/report/department",
        component: DepartmentReportComponent,
        resolve: {
            departments: DepartmentReportResolver
        },
        canActivate: [AuthGuard]
    }
];

@NgModule({
    declarations: [DepartmentReportComponent],
    imports: [RouterModule.forChild(routes)],
    providers: [DepartmentService, DepartmentReportResolver]
})
export class ReportModule {}
