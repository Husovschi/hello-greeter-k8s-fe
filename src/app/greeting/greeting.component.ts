import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-greeting',
  template: `
    <h1>{{ greeting }}</h1>
    <h2>Environment Variables:</h2>
    Getting values from Backend pod and Frontend k8s pods
    <ul>
      <li *ngFor="let envVar of environmentVars">
        Frontend value for {{ envVar['key'] }}: frontend {{ envVar['value'] }} backend {{ envVar[envVar['key']] }}
      </li>
    </ul>
  `,
})
export class GreetingComponent implements OnInit {
  greeting: string = 'Getting K8s Pod status from Frontend and Backend';
  environmentVars: Record<string, string>[] = [];

  constructor(private http: HttpClient) {}

  getRemoteEnvVar(envVarName: string){
    const backendUrl = environment.backendUrl;
    return this.http.get<Record<string, string>>(`${backendUrl}/env/${envVarName}`)
  }

  ngOnInit() {

    const objArray$ = environment.envVarKeys.map(({key}) => this.getRemoteEnvVar(key));
    combineLatest(objArray$).subscribe({
      next: (objects) => {
        this.environmentVars = objects.map((object, index) => ({...object, key: environment.envVarKeys[index].key, value: environment.envVarKeys[index].value}))
      },
      error: (error: HttpErrorResponse) => {

      }
    })
  }
}
