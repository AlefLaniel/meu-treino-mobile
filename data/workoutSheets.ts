import { WorkoutSheet } from "~/types/workout";


export const workoutSheets: WorkoutSheet[] = [
  {
      id: "ws1",
      name: "Plano de Treino A",
      description: "Plano de treino para ganho de massa muscular.",
      createdAt: "2024-12-01T08:30:00Z",
      plans: [
          {
              id: "wp1",
              name: "Treino de Peito e Tríceps",
              exercises: [
                {
                  id: "ex1",
                  name: "Supino Reto",
                  sets: 4,
                  reps: 8,
                  weight: 80,
                  notes: "Focar na forma e na execução"
              },
              {
                  id: "ex2",
                  name: "Crossover",
                  sets: 3,
                  reps: 12,
                  weight: 40,
                  notes: "Executar devagar e com controle"
              },
              {
                  id: "ex3",
                  name: "Tríceps Testa",
                  sets: 4,
                  reps: 10,
                  weight: 25,
                  notes: "Manter os cotovelos fixos"
              },
              {
                  id: "ex4",
                  name: "Supino Inclinado",
                  sets: 4,
                  reps: 8,
                  weight: 70,
                  notes: "Focar na parte superior do peitoral"
              },
              {
                  id: "ex5",
                  name: "Pullover",
                  sets: 3,
                  reps: 12,
                  weight: 35,
                  notes: "Respirar fundo durante o movimento"
              },
              {
                  id: "ex6",
                  name: "Tríceps Corda",
                  sets: 3,
                  reps: 15,
                  weight: 20,
                  notes: "Evitar abrir os cotovelos"
              },
              {
                  id: "ex7",
                  name: "Peck Deck",
                  sets: 4,
                  reps: 10,
                  weight: 50,
                  notes: "Manter o movimento controlado"
              },
              {
                  id: "ex8",
                  name: "Supino Declinado",
                  sets: 4,
                  reps: 8,
                  weight: 85,
                  notes: "Focar na parte inferior do peitoral"
              },
              {
                  id: "ex9",
                  name: "Tríceps Paralelas",
                  sets: 4,
                  reps: 10,
                  weight: 0,
                  notes: "Usar peso corporal"
              },
              {
                  id: "ex10",
                  name: "Crucifixo Reto",
                  sets: 3,
                  reps: 12,
                  weight: 25,
                  notes: "Focar na abertura máxima"
              }
              ]
          },
          {
              id: "wp2",
              name: "Treino de Costas e Bíceps",
              exercises: [
                {
                  id: "ex11",
                  name: "Puxada na Barra Fixa",
                  sets: 4,
                  reps: 6,
                  weight: 0,
                  notes: "Focar na amplitude do movimento"
              },
              {
                  id: "ex12",
                  name: "Remada Curvada",
                  sets: 4,
                  reps: 8,
                  weight: 70,
                  notes: "Evitar curvar a coluna"
              },
              {
                  id: "ex13",
                  name: "Rosca Direta",
                  sets: 3,
                  reps: 10,
                  weight: 22.5,
                  notes: "Manter os cotovelos fixos"
              },
              {
                  id: "ex14",
                  name: "Levantamento Terra",
                  sets: 4,
                  reps: 6,
                  weight: 100,
                  notes: "Manter a coluna reta"
              },
              {
                  id: "ex15",
                  name: "Puxada na Polia",
                  sets: 4,
                  reps: 12,
                  weight: 50,
                  notes: "Controlar o movimento"
              },
              {
                  id: "ex16",
                  name: "Rosca Alternada",
                  sets: 3,
                  reps: 12,
                  weight: 15,
                  notes: "Alternar os braços com controle"
              },
              {
                  id: "ex17",
                  name: "Remada Unilateral",
                  sets: 4,
                  reps: 10,
                  weight: 30,
                  notes: "Focar em um lado por vez"
              },
              {
                  id: "ex18",
                  name: "Rosca Martelo",
                  sets: 3,
                  reps: 12,
                  weight: 20,
                  notes: "Manter os punhos neutros"
              },
              {
                  id: "ex19",
                  name: "Pull Over",
                  sets: 4,
                  reps: 12,
                  weight: 40,
                  notes: "Controlar a respiração"
              },
              {
                  id: "ex20",
                  name: "Barra Fixa Supinada",
                  sets: 4,
                  reps: 6,
                  weight: 0,
                  notes: "Usar o peso corporal"
              }
              ]
          }
      ]
  },
  {
      id: "ws2",
      name: "Plano de Treino B",
      description: "Plano de treino para definição muscular.",
      createdAt: "2024-12-05T09:00:00Z",
      plans: [
          {
              id: "wp3",
              name: "Treino de Pernas",
              exercises: [
                {
                  id: "ex21",
                  name: "Agachamento Livre",
                  sets: 5,
                  reps: 10,
                  weight: 100,
                  notes: "Fazer agachamento profundo"
              },
              {
                  id: "ex22",
                  name: "Leg Press",
                  sets: 4,
                  reps: 12,
                  weight: 180,
                  notes: "Evitar travar os joelhos"
              },
              {
                  id: "ex23",
                  name: "Cadeira Extensora",
                  sets: 4,
                  reps: 15,
                  weight: 60,
                  notes: "Controlar o movimento"
              },
              {
                  id: "ex24",
                  name: "Cadeira Flexora",
                  sets: 3,
                  reps: 15,
                  weight: 50,
                  notes: "Evitar movimentos bruscos"
              },
              {
                  id: "ex25",
                  name: "Ponte de Glúteos",
                  sets: 4,
                  reps: 12,
                  weight: 20,
                  notes: "Manter a contração máxima"
              },
              {
                  id: "ex26",
                  name: "Passada",
                  sets: 3,
                  reps: 12,
                  weight: 30,
                  notes: "Alternar as pernas"
              },
              {
                  id: "ex27",
                  name: "Panturrilha no Smith",
                  sets: 4,
                  reps: 15,
                  weight: 50,
                  notes: "Usar amplitude máxima"
              },
              {
                  id: "ex28",
                  name: "Agachamento Sumô",
                  sets: 4,
                  reps: 10,
                  weight: 90,
                  notes: "Focar na parte interna da coxa"
              },
              {
                  id: "ex29",
                  name: "Step-Up",
                  sets: 3,
                  reps: 12,
                  weight: 25,
                  notes: "Usar banco estável"
              },
              {
                  id: "ex30",
                  name: "Stiff",
                  sets: 4,
                  reps: 10,
                  weight: 70,
                  notes: "Manter as costas retas"
              }
              ]
          },
          {
              id: "wp4",
              name: "Treino de Ombros e Abdômen",
              exercises: [
                  {
                      id: "ex10",
                      name: "Desenvolvimento com Halteres",
                      sets: 8,
                      reps: 16,
                      weight: 50,
                      notes: "Manter a postura"
                  },
                  {
                      id: "ex11",
                      name: "Elevação Lateral",
                      sets: 6,
                      reps: 24,
                      weight: 25,
                      notes: "Evitar movimentos rápidos"
                  },
                  {
                      id: "ex12",
                      name: "Abdominais na Bola Suíça",
                      sets: 8,
                      reps: 40,
                      weight: 0,
                      notes: "Manter a contração muscular"
                  }
              ]
          }
      ]
  }
];
