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
    notes: `O supino inclinado com halteres é um excelente exercício para desenvolver a parte superior do peitoral, focando especialmente na porção clavicular do peitoral maior, além de recrutar o deltoide anterior e o tríceps braquial.
Execução correta do supino inclinado com halteres
- Posição inicial: Sente-se em um banco inclinado (entre 30° e 45°) e segure um haltere em cada mão.
- Pegada e postura: Mantenha os halteres alinhados ao nível do peito, com os cotovelos dobrados e as palmas voltadas para frente.
- Descida controlada: Abaixe os halteres lentamente até que fiquem ao nível do peito ou ligeiramente abaixo, mantendo o controle do movimento.
- Subida explosiva: Empurre os halteres para cima em um movimento controlado, estendendo os braços sem travar completamente os cotovelos.
- Respiração: Inspire ao descer os halteres e expire ao empurrá-los para cima, garantindo melhor estabilidade e ativação muscular.
`,
    gifUrl: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/supino-inclinado-com-halteres.gif", // Pinterest[2]
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
