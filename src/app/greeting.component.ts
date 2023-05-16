import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-greeting',
  template: `
    <h1>{{ greeting }}</h1>
    <h2>Environment Variables:</h2>
    <ul>
      <li *ngFor="let envVar of environmentVars">
        {{ envVar.key }}: {{ envVar.value }}
      </li>
    </ul>
  `,
})
export class GreetingComponent implements OnInit {
  greeting: string;
  environmentVars: { key: string; value: string }[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const backendUrl = environment.backendUrl;

    this.http.get(`${backendUrl}/vars`).subscribe(
      (data: { [key: string]: string }) => {
        const frontendEnvVars = environment.frontendEnvVars;

        // Compare environment variables from frontend and backend
        for (const key in data) {
          const value = data[key];
          const matched = frontendEnvVars.find((envVar) => envVar.key === key);

          if (matched) {
            this.environmentVars.push({ key, value });
          }
        }

        this.greeting = 'Hello!';
      },
      (error) => {
        console.error(error);
        this.greeting = 'Error fetching data';
      }
    );
  }
}
