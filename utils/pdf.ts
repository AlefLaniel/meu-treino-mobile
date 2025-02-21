import {  WorkoutSheet } from "~/types/workout";


export const generateHTML = (sheets: WorkoutSheet[]): string => {
    return `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            line-height: 1.4;
          }
          .sheet {
            margin-bottom: 30px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          .sheet-header {
            border-bottom: 1px solid #ccc;
            margin-bottom: 10px;
          }
          .sheet-header h1 {
            margin: 0;
            color: #333;
          }
          .sheet-header p {
            margin: 5px 0;
            font-size: 14px;
            color: #666;
          }
          .plan {
            margin-top: 15px;
            padding: 10px;
            border: 1px dashed #ccc;
            border-radius: 5px;
          }
          .plan-header {
            margin-bottom: 8px;
          }
          .plan-header h2 {
            margin: 0;
            font-size: 18px;
            color: #444;
          }
          .exercise {
            margin-bottom: 10px;
          }
          .exercise p {
            margin: 2px 0;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        ${sheets.map(sheet => `
          <div class="sheet">
            <div class="sheet-header">
              <h1>${sheet.name}</h1>
              ${sheet.description ? `<p>${sheet.description}</p>` : ''}
              <p><strong>Criado em:</strong> ${sheet.createdAt}</p>
            </div>
            ${sheet.plans.map(plan => `
              <div class="plan">
                <div class="plan-header">
                  <h2>${plan.name} ${plan.done ? '(Concluído)' : ''}</h2>
                </div>
                ${plan.exercises.map(ex => `
                  <div class="exercise">
                    <p><strong>${ex.name}</strong></p>
                    <p>Sets: ${ex.sets} | Reps: ${ex.reps} | Peso: ${ex.weight} kg</p>
                    ${ex.notes ? `<p>Observações: ${ex.notes}</p>` : ''}
                    ${typeof ex.completed === 'boolean' ? `<p>Status: ${ex.completed ? 'Concluído' : 'Pendente'}</p>` : ''}
                  </div>
                `).join('')}
              </div>
            `).join('')}
          </div>
        `).join('')}
      </body>
    </html>
    `;
  };
  