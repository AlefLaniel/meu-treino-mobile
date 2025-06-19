import { Exercise } from "~/types/workout";

export type PresetExercise = Omit<Exercise, "id"> & { category: string };

export const presetExercises: PresetExercise[] = [
  // PEITO
  {
    category: "Peito",
    name: "Supino Reto com Barra",
    sets: 4,
    reps: 10,
    weight: 0,
    notes: `O supino reto com barra é um dos exercícios mais fundamentais para o desenvolvimento da parte superior do corpo, focando principalmente no peitoral maior, tríceps braquial e deltoide anterior. Ele é amplamente utilizado para ganho de força e hipertrofia.
Execução correta do supino reto com barra
- Posição inicial: Deite-se em um banco reto, mantendo os pés firmes no chão para estabilidade.
- Pegada na barra: Segure a barra com as mãos um pouco mais afastadas que a largura dos ombros, garantindo um ângulo adequado para ativação do peitoral.
- Descida controlada: Abaixe a barra lentamente até o peito, mantendo os cotovelos em um ângulo ligeiramente maior que 90 graus.
- Subida explosiva: Empurre a barra para cima até estender completamente os braços, sem travar os cotovelos.
- Respiração: Inspire ao descer a barra e expire ao empurrá-la para cima, garantindo melhor controle e estabilidade.

Importante: Mantenha sempre a postura correta, evitando arqueamento excessivo das costas e garantindo que os ombros estejam firmes contra o banco durante todo o movimento.`,
    gifUrl: "https://www.hipertrofia.org/blog/wp-content/uploads/2017/09/barbell-bench-press.gif", // GIF genérico do GIPHY[1]
  },
  {
    category: "Peito",
    name: "Supino Inclinado com Halteres",
    sets: 4,
    reps: 10,
    weight: 0,
    notes: `O supino inclinado com halteres prioriza a porção superior do peitoral, além de recrutar ombros e tríceps.  
- Posição inicial: Banco inclinado a 30–45°, halteres apoiados no colo.  
- Descida: Abaixe os halteres ao lado do peito, mantendo cotovelos ligeiramente flexionados.  
- Subida: Empurre unindo levemente os halteres no topo, sem encostar um no outro.  
- Respiração: Inspire na descida, expire na subida.  
Evite inclinações acima de 45° para não sobrecarregar demais os ombros.`,
    gifUrl: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/supino-inclinado-com-halteres.gif",
  },
  {
    category: "Peito",
    name: "Supino Declinado com Barra",
    sets: 4,
    reps: 10,
    weight: 0,
    notes: `O supino declinado foca a parte inferior do peitoral e reduz a participação dos ombros.  
- Posição inicial: Banco declinado de 15–30°, pés apoiados.  
- Descida: Leve a barra até a região inferior do tórax, mantendo coluna neutra.  
- Subida: Empurre até quase extensão total dos braços, sem travar os cotovelos.  
- Respiração: Inspire ao descer, expire ao subir.  
Mantenha a lombar levemente apoiada para evitar lesões.`,
    gifUrl: "https://www.hipertrofia.org/blog/wp-content/uploads/2018/09/barbell-decline-bench-press.gif",
  },
  {
    category: "Peito",
    name: "Crucifixo com Halteres",
    sets: 4,
    reps: 12,
    weight: 0,
    notes: `O crucifixo com halteres enfatiza o alongamento e a amplitude do peitoral maior.  
- Posição inicial: Banco reto (ou inclinado), braços estendidos com cotovelos levemente flexionados.  
- Descida: Abra os braços em arco até sentir bom alongamento no peito.  
- Subida: Una os halteres contraindo o peitoral, sem bater um no outro.  
- Respiração: Inspire descendo, expire subindo.  
Mantenha o movimento lento e controlado, cotovelos sempre fixos.`,
    gifUrl: "https://www.hipertrofia.org/blog/wp-content/uploads/2023/09/dumbbell-fly.gif",
  },
  {
    category: "Peito",
    name: "Crossover na Polia",
    sets: 4,
    reps: 12,
    weight: 0,
    notes: `O crossover isola e mantém tensão constante no peitoral.  
- Posição inicial: Polias ajustadas no alto, tronco levemente inclinado à frente.  
- Execução: Puxe ambas as alças em arco até as mãos se cruzarem à frente do corpo.  
- Retorno: Volte controladamente à posição inicial, mantendo o peitoral contraído.  
- Respiração: Inspire na volta, expire na contração.  
Varie a altura das polias (alto, médio, baixo) para diferentes ênfases.`,
    gifUrl: "https://i0.wp.com/meutreinador.com/wp-content/uploads/2024/04/Crossover-polia-alta.gif?fit=1080%2C1080&ssl=1",
  },
  {
    category: "Peito",
    name: "Mergulho em Paralelas (Dips)",
    sets: 4,
    reps: 10,
    weight: 0,
    notes: `O dip em paralelas, inclinado à frente, trabalha a parte inferior e média do peitoral.  
- Posição inicial: Apoie-se nas barras com braços estendidos, corpo levemente inclinado.  
- Descida: Flexione cotovelos até ~90°, sentindo alongamento no peito.  
- Subida: Estenda os braços sem travar totalmente os cotovelos.  
- Respiração: Inspire descendo, expire subindo.  
Para aumentar a carga, use cinto com anilhas.`,
    gifUrl: "https://static.wixstatic.com/media/2edbed_970bcb4dea734e9a9915ee3010726bb3~mv2.gif/v1/fill/w_360,h_360,al_c,pstr/2edbed_970bcb4dea734e9a9915ee3010726bb3~mv2.gif",
  },
  {
    category: "Peito",
    name: "Flexão de Braço (Push-Up)",
    sets: 4,
    reps: 15,
    weight: 0,
    notes: `A flexão de braço é um exercício versátil para peitoral, ombros e tríceps.  
- Posição inicial: Corpo alinhado da cabeça aos calcanhares, mãos na largura dos ombros.  
- Descida: Abaixe o peito em direção ao chão mantendo cotovelos a 45°.  
- Subida: Empurre até estender os braços, sem travar os cotovelos.  
- Respiração: Inspire descendo, expire subindo.  
Varie elevando os pés para mais dificuldade ou apoiando joelhos para reduzir carga.`,
    gifUrl: "https://newr7-r7-prod.web.arc-cdn.net/resizer/v2/TXD3PVKK65C75CP2TTUIZ4IWWQ.gif?smart=true&auth=05157f8994ca71ef885232d2eec1503ccd49498cca69a1ef21f2df885ae84db0&width=1200&height=630",
  },

  // PERNAS
  {
    category: "Pernas",
    name: "Agachamento Livre",
    sets: 4,
    reps: 10,
    weight: 0,
    notes: "Foco em postura",
    gifUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Squats_01.gif", // Wikimedia[7]
  },
  {
    category: "Pernas",
    name: "Avanço/Afundo",
    sets: 3,
    reps: 12,
    weight: 0,
    notes: "Trabalha glúteos e quadríceps",
    gifUrl: "https://media.giphy.com/media/3o7TKsQ7CT8xWZJz7W/giphy.gif", // GIPHY[6]
  },

  // COSTAS
  {
    category: "Costas",
    name: "Barra Fixa",
    sets: 3,
    reps: 8,
    weight: 0,
    notes: "Exercício com peso corporal",
    gifUrl: "https://cdn-iconscout.com/lottie/197/3576843/lat-pulldown-workout.json", // IconScout[8]
  },

  // OMBROS
  {
    category: "Ombros",
    name: "Elevação Lateral com Halteres",
    sets: 3,
    reps: 15,
    weight: 0,
    notes: "Cotovelos levemente flexionados",
    gifUrl: "https://media.womenshealthmag.com/642x482/photos/62723/GettyImages-1141073759.jpg", // Women's Health[9]
  },

  // ABDOMINAIS
  {
    category: "Abdominais",
    name: "Flexão de Braço",
    sets: 3,
    reps: 15,
    weight: 0,
    notes: "Exercício com peso corporal",
    gifUrl: "https://pixabay.com/gifs/push-ups-fitness-exercise-mousetrap-10262/", // Pixabay[10]
  }
];
