/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from "react";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Target, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight,
  Info,
  Layers,
  Sparkles,
  Trophy,
  PenTool,
  Send,
  Image as ImageIcon,
  FileText,
  Mic2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Types & Data ---

interface TimelineItem {
  id: string;
  item: string;
  responsible: string;
  status: "Pendente" | "Em Progresso" | "Concluído";
  deadline?: string;
  icon: any;
}

const PROGRAM_STEPS = [
  { time: "19h00", activity: "Recepcão dos convidados", desc: "Coquetel de boas-vindas, música ambiente e networking livre" },
  { time: "19h30", activity: "Abertura institucional", desc: "Breve apresentação do Portal da Acústica: história e trajetórias de 10 anos" },
  { time: "19h50", activity: "Palestra: Acústica para Arquitetos", desc: "Conduzida por Lucas Falcão (25 a 30 min)" },
  { time: "20h20", activity: "Parceria Portal × Arquitetos", desc: "Política de comissionamento, indicação e benefícios" },
  { time: "20h40", activity: "Envio do Material Técnico", desc: "Guia prático via QR Code / link exclusivo aos participantes" },
  { time: "20h50", activity: "Networking e Coquetel", desc: "Interação entre arquitetos, equipe do Portal e fornecedores" },
  { time: "22h00", activity: "Encerramento", desc: "" },
];

const TIMELINE_DATA: TimelineItem[] = [
  { id: "1", item: "Definir local", responsible: "Portal da Acústica", status: "Pendente", icon: MapPin },
  { id: "2", item: "Confirmar disponibilidade de Lucas Falcão", responsible: "Portal da Acústica", status: "Pendente", icon: Users },
  { id: "3", item: "Definir data do evento", responsible: "Portal da Acústica", status: "Pendente", icon: Calendar },
  { id: "4", item: "Lista de Convidados", responsible: "Portal da Acústica", status: "Pendente", icon: Target },
  { id: "5", item: "Envio informações para conteúdos", responsible: "Portal da Acústica", status: "Pendente", icon: Info },
  { id: "6", item: "Aprovar proposta de escopo e dar ordem de início à agência", responsible: "Portal da Acústica", status: "Pendente", icon: CheckCircle2 },
  { id: "7", item: "Convite Digital e Impresso", responsible: "Coyô", status: "Pendente", deadline: "13 dias úteis", icon: Send },
  { id: "12", item: "Guia de Tratamento Acústico (cliente final)", responsible: "Coyô", status: "Pendente", deadline: "13 dias úteis", icon: FileText },
  { id: "8", item: "Apresentação de slides para o evento", responsible: "Coyô", status: "Pendente", deadline: "4 dias úteis", icon: ImageIcon },
  { id: "9", item: "Material Técnico para/ Arquitetos", responsible: "Coyô", status: "Pendente", deadline: "4 dias úteis", icon: FileText },
  { id: "10", item: "Posts para redes sociais", responsible: "Coyô", status: "Pendente", deadline: "2 dias úteis", icon: PenTool },
  { id: "11", item: "Backdrop / painel para o local", responsible: "Coyô", status: "Pendente", deadline: "5 dias úteis", icon: Mic2 },
];

// --- Components ---

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-10">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-2 block">
          {subtitle || "Portal da Acústica"}
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [selectedScenario, setSelectedScenario] = useState<"sjc" | "sp">("sjc");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white font-sans">
      
      {/* --- DASHBOARD HEADER --- */}
      <header className="px-6 py-8 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border-b border-slate-200">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-3xl shadow-lg ring-4 ring-indigo-50">
            A
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Portal da Acústica - 10 Anos</h1>
            <p className="text-slate-500 text-sm font-medium">Acústica para Arquitetos: Noite de Lançamento</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-100 flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Status: Planejamento
          </div>
          <div className="bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold border border-indigo-100 italic">
            Meta: Evento Celebração 10 Anos
          </div>
        </div>
      </header>

      <main className="p-6 md:p-12 space-y-12 max-w-[1600px] mx-auto">
        
        {/* --- TOP BENTO GRID: VISION & OBJECTIVES --- */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Vision Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-12 lg:col-span-5 bg-indigo-900 rounded-3xl p-8 text-white flex flex-col justify-between shadow-xl min-h-[400px]"
          >
            <div>
              <div className="bg-white/10 self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8 backdrop-blur-sm border border-white/10">
                Visão Geral
              </div>
              <h2 className="text-4xl font-bold mb-6 leading-tight">Unindo celebração e <br/><span className="text-indigo-300">geração de valor estratégico.</span></h2>
              <p className="text-indigo-100 leading-relaxed text-sm lg:text-base font-light opacity-90 max-w-md">
                Um evento para arquitetos e parceiros estreitarem laços e formalizarem novos horizontes comerciais.
              </p>
            </div>
            <div className="flex gap-6 pt-10">
              <div className="text-center bg-white/5 p-4 rounded-2xl flex-1 backdrop-blur-sm border border-white/5">
                <span className="block text-3xl font-bold">10</span>
                <span className="text-[10px] uppercase font-bold opacity-50 tracking-tighter">Anos</span>
              </div>
              <div className="text-center bg-white/5 p-4 rounded-2xl flex-1 backdrop-blur-sm border border-white/5">
                <span className="block text-3xl font-bold">03</span>
                <span className="text-[10px] uppercase font-bold opacity-50 tracking-tighter">Horas</span>
              </div>
            </div>
          </motion.div>

          {/* Objectives Bento Cards */}
          <div className="md:col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                icon: Target, 
                label: "Negócio", 
                bg: "bg-white",
                accent: "bg-indigo-50 text-indigo-600",
                color: "text-slate-800",
                items: [
                  "Apresentar política de comissionamento",
                  "Captar novos arquitetos parceiros",
                  "Formalizar alianças estratégicas",
                  "Posicionar marca técnica premium"
                ] 
              },
              { 
                icon: Users, 
                label: "Relacionamento", 
                bg: "bg-white",
                accent: "bg-emerald-50 text-emerald-600",
                color: "text-slate-800",
                items: [
                  "Celebrar 10 anos com stakeholders",
                  "Networking qualificado",
                  "Proximidade equipe comercial"
                ] 
              },
              { 
                icon: Sparkles, 
                label: "Comunicação e Marca", 
                bg: "bg-white",
                accent: "bg-orange-50 text-orange-600",
                color: "text-slate-800",
                span: "md:col-span-2",
                items: [
                  "Reforçar autoridade técnica",
                  "Gerar conteúdo institucional estratégico",
                  "Entregar material técnico de valor"
                ] 
              }
            ].map((cat, i) => (
              <motion.div 
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${cat.bg} rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col ${cat.span || ""}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 ${cat.accent} rounded-xl`}>
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold ${cat.color}`}>{cat.label}</h3>
                </div>
                <ul className="space-y-3 flex-grow">
                  {cat.items.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-500 text-xs font-medium leading-relaxed">
                      <div className="mt-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </section>

        {/* --- SECOND BLOCK: PROGRAM & LOCATIONS --- */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Program Card */}
          <div className="md:col-span-12 lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-bold text-slate-800">Programação Detalhada</h3>
              <div className="p-2 bg-slate-50 rounded-lg">
                <Clock className="w-5 h-5 text-slate-400" />
              </div>
            </div>
            
            <div className="space-y-4">
              {PROGRAM_STEPS.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex gap-6 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                >
                  <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg h-fit">
                    {step.time}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">{step.activity}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Locations Bento Block */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6 font-sans">
            <div className="flex-grow bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-3">
                 <MapPin className="w-5 h-5 text-indigo-600" /> Cenários de Local
              </h3>
              
              <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
                {["sjc", "sp"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedScenario(type as any)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                      selectedScenario === type 
                        ? "bg-white text-indigo-600 shadow-sm" 
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {type === "sjc" ? "Vale do Paraíba" : "São Paulo"}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedScenario}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Público-Alvo</span>
                    <p className="text-sm font-bold text-slate-800">
                      {selectedScenario === "sjc" ? "30 a 60 pessoas" : "60 a 100 pessoas"}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-2">Perfil</span>
                    <p className="text-sm font-medium text-indigo-700 leading-snug">
                      {selectedScenario === "sjc" 
                        ? "Ambiente Gastronômico Sofisticado" 
                        : "Showroom TS Home (Parceiro)"}
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <p className="text-xs text-slate-500 leading-relaxed font-medium italic">
                      {selectedScenario === "sjc" 
                        ? "Vantagem: Maior exclusividade e controle do público VIP." 
                        : "Vantagem: Posicionamento na capital e maior base de contatos."}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </section>

        {/* --- THIRD BLOCK: CONTEÚDO E MATERIAIS --- */}
        <section className="space-y-6">
          <SectionHeader title="Conteúdo e Materiais" subtitle="Produção Criativa" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Material para o Cliente Final Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-12 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Material para o Cliente Final do Arquiteto: "Guia de Tratamento Acústico"</h3>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Objetivo: Facilitar a venda e compreensão do valor pelo leigo</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed mb-6">
                    Material complementar pensado para o cliente final, que o arquiteto entregará durante a apresentação de um projeto. Posiciona o arquiteto como consultor especializado e o Portal da Acústica como a solução técnica por trás, gerando credibilidade para ambos.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <h4 className="text-[10px] font-bold text-indigo-600 uppercase mb-2">Formato Sugerido</h4>
                      <ul className="text-[10px] text-slate-500 space-y-1">
                        <li>• Impresso de alta qualidade (folder 1 ou 2 dobras)</li>
                        <li>• Visual sofisticado, linguagem acessível</li>
                        <li>• Identidade Portal da Acústica</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <h4 className="text-[10px] font-bold text-indigo-600 uppercase mb-2">Conteúdo Chave</h4>
                      <ul className="text-[10px] text-slate-500 space-y-1">
                        <li>• Por que a acústica impacta o bem-estar</li>
                        <li>• Problemas comuns: Ruído, Reverberação, Eco</li>
                        <li>• Soluções por ambiente (Home, Office, Social)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3 bg-indigo-900 rounded-2xl p-6 text-white flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles className="w-20 h-20" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Guia Prático</h4>
                  <p className="text-indigo-200 text-xs mb-4">"A ferramenta que faltava para o seu cliente entender que acústica não é luxo, é saúde."</p>

                </div>
              </div>
            </motion.div>

            {/* Slides Presentation Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-8 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Apresentação para o Evento (Slides)</h3>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Responsável: Coyô</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                {[
                  "Capa e identidade visual do evento (10 anos)",
                  "Bloco 1: Quem somos, história e conquistas",
                  "Bloco 2: Conteúdo técnico - Lucas Falcão",
                  "Bloco 3: Parceria, comissionamento e fluxo",
                  "Bloco 4: Próximos passos e formalização",
                  "Encerramento com agradecimentos"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 text-slate-600 text-[11px] font-medium items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Support Material Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-4 bg-indigo-50/30 rounded-3xl border border-indigo-100 p-8 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" /> Material de Apoio Digital
                </h3>
                <p className="text-indigo-700/70 text-xs leading-relaxed mb-6 font-medium">
                  Guia técnico disponibilizado via QR Code para uso imediato e abordagens futuras.
                </p>
                <ul className="space-y-2">
                  {["Conceitos básicos", "Quando tratar?", "Produtos & Soluções", "Passo a passo parceria"].map((li, i) => (
                    <li key={i} className="text-[10px] font-bold text-indigo-500 uppercase tracking-tight flex items-center gap-2">
                      <div className="w-1 h-1 bg-indigo-400 rounded-full" /> {li}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 flex gap-2">
                <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-indigo-500" />
                </div>
              </div>
            </motion.div>

            {/* Critical Info Alert Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-4 bg-orange-50 rounded-3xl border border-orange-100 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Info className="w-5 h-5 text-orange-600" />
                <h3 className="font-bold text-orange-900">Informações Críticas</h3>
              </div>
              <p className="text-orange-800/70 text-[11px] font-medium leading-relaxed mb-8">
                Dados pendentes para início da produção dos materiais criativos:
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-white/60 rounded-2xl border border-orange-200">
                  <p className="text-[10px] font-bold text-orange-600 uppercase mb-1">Conteúdo</p>
                  <p className="text-xs font-bold text-orange-900 leading-tight">Lucas Falcão (Palestra Técnica)</p>
                </div>
                <div className="p-4 bg-white/60 rounded-2xl border border-orange-200">
                  <p className="text-[10px] font-bold text-orange-600 uppercase mb-1">Estrutura</p>
                  <p className="text-xs font-bold text-orange-900 leading-tight">Políticas da Parceria Portal × Arquitetos</p>
                </div>
              </div>
            </motion.div>

            {/* Other Materials & Recording Bento */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Produção Física & Social</h4>
                <div className="space-y-4 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <Send className="w-4 h-4 text-indigo-500" /> Convite Digital e Impresso
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <PenTool className="w-4 h-4 text-indigo-500" /> Posts para Redes Sociais
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <Layers className="w-4 h-4 text-indigo-500" /> Backdrop / Painel Fotográfico
                  </div>
                </div>
              </div>
              <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between shadow-lg">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Registro do Evento</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-bold">Fotografia Profissional</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <Mic2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-bold">Vídeo Teaser / Aftermovie</span>
                    </div>
                  </div>
                </div>
                <div className="pt-8 opacity-40 text-[9px] font-bold uppercase tracking-tighter italic">
                  * Equipe dedicada de Full Coverage
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- FOURTH BLOCK: TIMELINE --- */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Linha do Tempo Estratégica</h3>
              <p className="text-slate-500 text-xs font-medium">Dashboard de Atividades e Prazos de Execução</p>
            </div>
            <div className="flex flex-col items-end gap-2">
               <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <Calendar className="w-5 h-5" />
               </div>
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                 Arraste para ver mais →
               </span>
            </div>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 scroll-smooth snap-x"
          >
            {TIMELINE_DATA.map((task, i) => (
              <motion.div 
                key={task.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="min-w-[280px] snap-center bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-200 transition-colors group"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-2 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform border border-slate-100">
                        <task.icon className="w-4 h-4 text-indigo-600" />
                     </div>
                     <span className="text-[9px] px-2 py-1 bg-white border border-slate-200 rounded-full font-bold text-slate-400 tracking-tighter">
                       {task.status.toUpperCase()}
                     </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mb-2 leading-snug">{task.item}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Resp: {task.responsible}</p>
                </div>
                
                <div className="mt-8 pt-4 border-t border-slate-200/50 flex items-center justify-between">
                   <Clock className="w-3 h-3 text-slate-300" />
                   <span className="text-[10px] font-bold text-slate-500">{task.deadline || "Pendente"}</span>
                </div>
              </motion.div>
            ))}
            
            <div className="min-w-[150px] flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all opacity-40 hover:opacity-100 cursor-pointer">
              <div className="text-center group-last:hidden">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-indigo-50 transition-colors">
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Execução</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- FINAL BLOCK: BUDGETS --- */}
        <section className="space-y-6">
          <SectionHeader title="Estimativa de Investimentos" subtitle="Planejamento de Custos" />
          
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs mb-8">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 border border-slate-300">
                    <th className="p-3 text-left font-bold border border-slate-300">Item / Descrição</th>
                    <th className="p-3 text-center font-bold border border-slate-300 w-24">Qtd.</th>
                    <th className="p-3 text-center font-bold border border-slate-300 w-32">Unit.</th>
                    <th className="p-3 text-right font-bold border border-slate-300 w-32">Total Est.</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  {/* Local & Buffet */}
                  <tr className="bg-slate-50">
                    <td colSpan={4} className="p-3 font-bold border border-slate-300 text-slate-900 uppercase tracking-tighter">
                      LOCAL & BUFFET - Opções disponíveis
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-300 font-medium">Coronel (valor por pessoa)</td>
                    <td className="p-3 text-center border border-slate-300">30</td>
                    <td className="p-3 text-center border border-slate-300 text-slate-500">R$345,00</td>
                    <td className="p-3 text-right border border-slate-300 font-bold text-slate-900 whitespace-nowrap">R$ 10.350,00</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-300 font-medium">Armazém (valor por pessoa)</td>
                    <td className="p-3 text-center border border-slate-300">30</td>
                    <td className="p-3 text-center border border-slate-300 text-slate-500">R$195,00</td>
                    <td className="p-3 text-right border border-slate-300 font-bold text-slate-900 whitespace-nowrap">R$ 5.850,00</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-300 font-medium">Dom da Carne - consumo (valor por pessoa)</td>
                    <td className="p-3 text-center border border-slate-300">30</td>
                    <td className="p-3 text-center border border-slate-300 text-slate-500 italic">R$ 177,00 (média)</td>
                    <td className="p-3 text-right border border-slate-300 font-bold text-slate-900 whitespace-nowrap">R$ 5.310,00</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-300 font-medium">Dom da Carne - adicional espaço exclusivo</td>
                    <td className="p-3 text-center border border-slate-300">1 espaço</td>
                    <td className="p-3 text-center border border-slate-300 text-slate-500">R$ 1.500–3.000</td>
                    <td className="p-3 text-right border border-slate-300 font-bold text-slate-900 whitespace-nowrap">R$ 1.500–3.000</td>
                  </tr>
                  <tr className="bg-emerald-50/50">
                    <td colSpan={3} className="p-3 text-right font-bold border border-slate-300 text-slate-600">Subtotal</td>
                    <td className="p-3 text-right font-bold border border-slate-300 text-slate-900 italic">Ver acima</td>
                  </tr>

                  {/* Communication & Production */}
                  <tr className="bg-slate-50">
                    <td colSpan={4} className="p-3 font-bold border border-slate-300 text-slate-900 uppercase tracking-tighter pt-6">
                      MATERIAIS DE COMUNICAÇÃO E PRODUÇÃO
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-300 font-medium">Convite impresso</td>
                    <td className="p-3 text-center border border-slate-300">30 unid</td>
                    <td className="p-3 text-center border border-slate-300 text-slate-500">R$3,00</td>
                    <td className="p-3 text-right border border-slate-300 font-bold text-slate-900 whitespace-nowrap">R$ 90,00</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-300 font-medium">Guia de Tratamento Acústico (cliente final)</td>
                    <td className="p-3 text-center border border-slate-300">30 unid</td>
                    <td className="p-3 text-center border border-slate-300 text-slate-500">R$1,70</td>
                    <td className="p-3 text-right border border-slate-300 font-bold text-slate-900 whitespace-nowrap">R$ 51,00</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-300 font-medium">Backdrop 300cm x 200cm</td>
                    <td className="p-3 text-center border border-slate-300">1 unid</td>
                    <td className="p-3 text-center border border-slate-300 text-slate-500">R$580,00</td>
                    <td className="p-3 text-right border border-slate-300 font-bold text-slate-900 whitespace-nowrap">R$ 580,00</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-slate-300 font-medium">Fotografia profissional + Vídeo (4h)</td>
                    <td className="p-3 text-center border border-slate-300">1 pacote</td>
                    <td className="p-3 text-center border border-slate-300 text-slate-500">R$3.000,00</td>
                    <td className="p-3 text-right border border-slate-300 font-bold text-slate-900 whitespace-nowrap">R$ 3.000,00</td>
                  </tr>
                  <tr className="bg-emerald-50/50">
                    <td colSpan={3} className="p-3 text-right font-bold border border-slate-300 text-slate-600">Subtotal</td>
                    <td className="p-3 text-right font-bold border border-slate-300 text-slate-900 whitespace-nowrap">R$ 3.670,00</td>
                  </tr>
                </tbody>
              </table>

              {/* ESTIMATIVA TOTAL Summary */}
              <div className="max-w-3xl">
                <table className="w-full border-collapse border-y-[1.5px] border-slate-900 font-sans">
                  <tbody>
                    <tr className="border-b border-slate-900">
                      <td className="p-4 text-xs font-bold uppercase tracking-tight text-slate-900 border-x-[1.5px] border-slate-900">
                        ESTIMATIVA TOTAL - Cenário A (Armazém + Materiais, 30 pax)
                      </td>
                      <td className="p-4 text-right text-sm font-extrabold text-slate-900 border-r-[1.5px] border-slate-900 whitespace-nowrap w-40">
                        R$ 9.520,00
                      </td>
                    </tr>
                    <tr className="border-b border-slate-900">
                      <td className="p-4 text-xs font-bold uppercase tracking-tight text-slate-900 border-x-[1.5px] border-slate-900">
                        ESTIMATIVA TOTAL - Cenário A (Coronel + Materiais, 30 pax)
                      </td>
                      <td className="p-4 text-right text-sm font-extrabold text-slate-900 border-r-[1.5px] border-slate-900 whitespace-nowrap w-40">
                        R$ 14.020,00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center italic opacity-60">
                Os valores são estimativas. Orçamentos definitivos serão solicitados após a definição do cenário de local e aprovação do escopo pela equipe do Portal da Acústica.
              </p>
            </div>
          </div>
        </section>

      </main>

      <footer className="px-6 py-12 md:px-12 bg-white border-t border-slate-200 text-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
          © 2026 Portal da Acústica • Lab de Design Coyô
        </p>
      </footer>

      {/* Custom Styles for scrollbar hiding */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Custom scrollbar for timeline */
        .snap-x::-webkit-scrollbar {
          height: 6px;
        }
        .snap-x::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .snap-x::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .snap-x::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
