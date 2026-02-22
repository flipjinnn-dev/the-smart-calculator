// Meta data for all calculators across all languages
// Manual management for SEO control

interface CalculatorMetaData {
  [language: string]: {
    title: string;
    description: string;
    slug: string;
    keywords: string;
  };
}

interface CalculatorMeta {
  [calculatorId: string]: CalculatorMetaData;
}

export const calculatorsMeta: CalculatorMeta = {
  'mortgage-calculator': {
    en: {
      title: "Mortgage Calculator",
      description: "Calculate monthly mortgage payments, total interest, and amortization schedule",
      slug: "/financial/mortgage-calculator",
      keywords: "mortgage, calculator, calculate, monthly, payments, total, interest, amortization, schedule"
    },
    pl: {
      title: "Kalkulator Kredytu Hipotecznego – Oblicz Ratę Online",
      description: "Użyj kalkulatora kredytu hipotecznego online, aby obliczyć raty, odsetki i całkowity koszt kredytu. Szybkie, dokładne i darmowe narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-kredytu-hipotecznego",
      keywords: "kalkulator kredytu hipotecznego, raty miesięczne, całkowite odsetki, harmonogram amortyzacji, kredyt hipoteczny online, finansowanie domu, darmowe narzędzie hipoteczne, obliczenia odsetek"
    },
    br: {
      title: "Calculadora de Financiamento Imobiliário",
      description: "Calcule prestações mensais da hipoteca, juros totais e planejamento de amortização. Ferramenta completa para simular seu financiamento imobiliário.",
      slug: "/br/financeiro/simulador-hipoteca",
      keywords: "calculadora hipoteca, financiamento imobiliário, prestações mensais, simulador financiamento, amortização, juros hipoteca, calculadora imóveis, planejamento financeiro"
    },
    de: {
      title: "Hypothekenrechner",
      description: "Berechnen Sie Ihre monatlichen Hypothekenzahlungen, Gesamtzinsen und Tilgungsplan. Umfassendes Tool für Ihre Immobilienfinanzierung.",
      slug: "/de/finanziell/hypotheken-rechner",
      keywords: "Hypothekenrechner, Baufinanzierung, monatliche Rate, Tilgungsplan, Zinsen berechnen, Immobilienfinanzierung, Darlehensrechner"
    },
    es: {
      title: "Simulador de Hipoteca – Calcula tu Hipoteca y Préstamo con Tasa de Interés",
      description: "Utiliza nuestro simulador de hipoteca para calcular tu préstamo hipotecario, conocer la tasa de interés y planificar tus pagos de manera rápida y precisa.",
      slug: "/es/financiero/simulador-de-hipoteca",
      keywords: "simulador, hipoteca, calcula, préstamo, tasa, interés, utiliza, nuestro, calcular, hipotecario, conocer, planificar, pagos, manera, rápida"
    }
  },
  'finance-calculator': {
    en: {
      title: "Finance Calculator",
      description: "A comprehensive tool for various financial calculations",
      slug: "/financial/finance-calculator",
      keywords: "finance, calculator, comprehensive, tool, various, financial, calculations"
    },
    pl: {
      title: "Kalkulator Finansowy – Oblicz Finanse Online",
      description: "Użyj kalkulatora finansowego online, aby wykonać różne obliczenia finansowe. Proste, dokładne i darmowe narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-finansowy",
      keywords: "kalkulator finansowy, obliczenia finansowe, procent składany, wartość obecna, wartość przyszła"
    },
    br: {
      title: "Calculadora Financeira",
      description: "Ferramenta completa para cálculos financeiros diversos, incluindo juros compostos, valor presente e futuro, e análise de investimentos.",
      slug: "/br/financeiro/calculadora-financeira",
      keywords: "calculadora financeira, cálculos financeiros, juros compostos, valor presente, valor futuro, análise financeira, planejamento financeiro"
    },
    de: {
      title: "Finanzrechner",
      description: "Umfassendes Tool für verschiedene Finanzberechnungen, einschließlich Zinseszins, Gegenwarts- und Zukunftswert sowie Investitionsanalyse.",
      slug: "/de/finanziell/finanz-rechner",
      keywords: "Finanzrechner, Finanzberechnungen, Zinseszins, Barwert, Zukunftswert, Finanzanalyse, Finanzplanung"
    },
    es: {
      title: "Calculadora Financiera – Gestiona Préstamos, Inversiones e Intereses",
      description: "Utiliza nuestra calculadora financiera para calcular préstamos, planificar inversiones y controlar los intereses de manera rápida y eficiente.",
      slug: "/es/financiero/calculadora-financiera",
      keywords: "calculadora, financiera, gestiona, préstamos, inversiones, intereses, utiliza, nuestra, calcular, planificar, controlar, manera, rápida, eficiente"
    }
  },
  '401k-calculator': {
    en: {
      title: "401(k) Calculator",
      description: "Estimate your 401(k) savings growth and retirement income",
      slug: "/financial/401k-calculator",
      keywords: "401k, calculator, estimate, your, savings, growth, retirement, income"
    },
    pl: {
      title: "Kalkulator 401(k) – Oblicz Oszczędności Emerytalne",
      description: "Użyj kalkulatora 401(k) online, aby oszacować wzrost oszczędności emerytalnych i przyszły dochód. Planuj swoją przyszłość finansową.",
      slug: "/pl/finansowy/kalkulator-401-k",
      keywords: "kalkulator 401k, emerytura, oszczędności emerytalne, przyszły dochód, planowanie emerytury"
    },
    br: {
      title: "Calculadora de Aposentadoria 401(k)",
      description: "Calcule o crescimento da sua poupança de aposentadoria 401(k) e estime sua renda futura. Planeje seu futuro financeiro com precisão.",
      slug: "/br/financeiro/calculadora-401k",
      keywords: "calculadora 401k, aposentadoria, poupança, rendimento futuro, planejamento aposentadoria, investimento longo prazo, previdência privada"
    },
    de: {
      title: "401(k) Rentenrechner",
      description: "Berechnen Sie das Wachstum Ihrer 401(k)-Rentenersparnisse und schätzen Sie Ihr zukünftiges Einkommen. Planen Sie Ihre finanzielle Zukunft.",
      slug: "/de/finanziell/401-k-rechner",
      keywords: "401k Rechner, Rente, Altersvorsorge, Rentenersparnisse, Zukunftseinkommen, Ruhestandsplanung, langfristige Investitionen"
    }
    ,
    es: {
      title: "Calculadora de 401k: Planifica tu retiro fácilmente",
      description: "Usa nuestra calculadora 401k para estimar tus ahorros de jubilación, aportes y crecimiento. Planifica tu futuro financiero con proyecciones claras y confiables.",
      slug: "/es/financiero/calculadora-de-401k",
      keywords: "calculadora, planifica, retiro, fácilmente, nuestra, estimar, ahorros, jubilación, aportes, crecimiento, futuro, financiero, proyecciones, claras, confiables"
    }
  },
  'debt-payoff-calculator': {
    en: {
      title: "Debt Payoff Calculator",
      description: "Create a debt payoff plan and see how long it will take to become debt-free",
      slug: "/financial/debt-payoff-calculator",
      keywords: "debt, payoff, calculator, create, plan, see, how, long, will, take"
    },
    pl: {
      title: "Kalkulator Spłaty Długów – Oblicz Plan Spłaty Online",
      description: "Użyj kalkulatora spłaty długów online, aby stworzyć plan spłaty i sprawdzić, ile czasu zajmie pozbycie się długów. Proste i dokładne narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-dlugu-splaty-kalkulador",
      keywords: "kalkulator długów, spłata długów, plan spłaty, wolność od długów, zarządzanie długiem"
    },
    br: {
      title: "Calculadora de Quitação de Dívidas",
      description: "Crie um plano personalizado de quitação de dívidas e descubra quanto tempo levará para ficar livre de dívidas. Organize suas finanças de forma eficiente.",
      slug: "/br/financeiro/calculadora-de-quitacao-de-dividas",
      keywords: "calculadora dívidas, quitação dívidas, planejamento financeiro, livre de dívidas, pagamento dívidas, organização financeira"
    },
    de: {
      title: "Schuldentilgungsrechner – Online Plan zur Schuldenfreiheit",
      description: "Mit dem Schuldentilgungsrechner erstellen Sie einen Tilgungsplan und sehen, wie lange es dauert, schuldenfrei zu werden. Planen Sie Ihre finanzielle Freiheit.",
      slug: "/de/finanziell/schulden-tilgungsrechner",
      keywords: "Schuldenrechner, Schuldentilgung, Schuldenabbau, Tilgungsplan, Entschuldung, Schuldenmanagement, Schuldenfrei"
    }
    ,
    es: {
      title: "Calculadora de pago de deudas: Organiza tus finanzas hoy",
      description: "Calcula tus pagos de deudas fácilmente. Planifica amortizaciones, conoce intereses y organiza tus finanzas para lograr libertad financiera más rápido.",
      slug: "/es/financiero/calculadora-de-pago-de-deudas",
      keywords: "calculadora, pago, deudas, organiza, finanzas, calcula, pagos, fácilmente, planifica, amortizaciones, conoce, intereses, lograr, libertad, financiera"
    }
  },
  'house-affordability-calculator': {
    en: {
      title: "House Affordability Calculator",
      description: "Determine how much house you can afford based on your income and expenses",
      slug: "/financial/house-affordability-calculator",
      keywords: "house, affordability, calculator, determine, how, much, you, can, afford, based"
    },
    pl: {
      title: "Kalkulator Dostępności Domu – Oblicz Budżet na Dom",
      description: "Użyj kalkulatora dostępności domu online, aby sprawdzić, ile możesz wydać na dom w zależności od dochodów i wydatków. Proste i dokładne narzędzie.",
      slug: "/pl/finansowy/kalkulator-dostepnosci-domu",
      keywords: "kalkulator domu, dostępność domu, budżet na dom, ile stać mnie na dom, finansowanie domu"
    },
    br: {
      title: "Calculadora de Capacidade de Compra de Imóvel",
      description: "Descubra quanto você pode investir em um imóvel com base em sua renda e despesas. Planejamento inteligente para compra da casa própria.",
      slug: "/br/financeiro/calculadora-de-acessibilidade-a-habitacao",
      keywords: "calculadora imóvel, capacidade compra, financiamento casa, orçamento imóvel, planejamento compra casa, análise financeira imóvel"
    },
    de: {
      title: "Haus-Erschwinglichkeitsrechner – Budgetplanung für Immobilienkauf",
      description: "Mit dem Haus-Erschwinglichkeitsrechner ermitteln Sie, wie viel Haus Sie sich leisten können basierend auf Ihrem Einkommen und Ausgaben. Intelligente Budgetplanung.",
      slug: "/de/finanziell/haus-erschwinglichkeitsrechner",
      keywords: "Immobilienrechner, Hausfinanzierung, Eigenheimkalkulator, Budgetplanung, Immobilienkauf, Finanzierungsrechner"
    }
    ,
    es: {
      title: "Calculadora de asequibilidad de vivienda: Encuentra tu hogar",
      description: "Calcula cuánto puedes pagar por una vivienda según tus ingresos y gastos. Planifica tu compra de casa con proyecciones claras y decisiones seguras.",
      slug: "/es/financiero/calculadora-de-asequibilidad-de-vivienda",
      keywords: "calculadora, asequibilidad, vivienda, encuentra, hogar, calcula, cuánto, puedes, pagar, según, ingresos, gastos, planifica, compra, casa"
    }
  },
  'estate-tax-calculator': {
    en: {
      title: "Estate Tax Calculator",
      description: "Estimate potential estate taxes and plan your estate accordingly",
      slug: "/financial/estate-tax-calculator",
      keywords: "estate, tax, calculator, estimate, potential, taxes, plan, your, accordingly"
    },
    pl: {
      title: "Podatek od Nieruchomości Kalkulator – Oblicz Online",
      description: "Użyj podatek od nieruchomości kalkulator online, aby szybko obliczyć wysokość podatku. Proste, dokładne i darmowe narzędzie finansowe dla każdego.",
      slug: "/pl/finansowy/podatek-od-nieruchomosci-kalkulator",
      keywords: "kalkulator podatku od nieruchomości, podatki spadkowe, planowanie spadku, szacowanie podatków"
    },
    br: {
      title: "Calculadora de Imposto sobre Herança",
      description: "Calcule impostos potenciais sobre herança e planeje seu patrimônio de forma adequada. Ferramenta essencial para planejamento sucessório.",
      slug: "/br/financeiro/calculadora-de-imposto-sobre-heranca",
      keywords: "calculadora herança, imposto sucessório, planejamento patrimonial, tributos herança, sucessão, inventário"
    },
    de: {
      title: "Erbschaftsteuer­rechner – Ihre Online-Berechnung für Erbe",
      description: "Mit dem Erbschaftsteuer­rechner ermitteln Sie Steuern auf Ihr Erbe und planen Ihre Nachlassverwaltung optimal.",
      slug: "/de/finanziell/erbschaftsteuerrechner",
      keywords: "Erbschaftssteuerrechner, Nachlassplanung, Erbschaftssteuer, Vermögensplanung, Nachfolgeplanung, Erbe"
    }
    ,
    es: {
      title: "Calculadora del impuesto sobre el patrimonio: Planifica hoy",
      description: "Calcula tu impuesto sobre el patrimonio fácilmente. Conoce cuánto debes pagar y organiza tus finanzas para optimizar tu planificación fiscal de forma segura.",
      slug: "/es/financiero/calculadora-del-impuesto-sobre-el-patrimonio",
      keywords: "calculadora, impuesto, sobre, patrimonio, planifica, calcula, fácilmente, conoce, cuánto, debes, pagar, organiza, finanzas, optimizar, planificación"
    }
  },
  'credit-card-payoff-calculator': {
    en: {
      title: "Credit Card Payoff Calculator",
      description: "Calculate how long it will take to pay off your credit card debt and interest",
      slug: "/financial/credit-card-payoff-calculator",
      keywords: "credit, card, payoff, calculator, calculate, how, long, will, take, pay"
    },
    pl: {
      title: "Kalkulator Spłaty Karty Kredytowej – Oblicz Online",
      description: "Użyj kalkulatora spłaty karty kredytowej online, aby obliczyć raty, odsetki i czas spłaty. Proste, szybkie i dokładne narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-splaty-karty-kredytowej",
      keywords: "kalkulator spłaty karty kredytowej, dług kartowy, odsetki kartowe, czas spłaty, redukcja długu"
    },
    br: {
      title: "Calculadora de Pagamento de Cartão de Crédito",
      description: "Calcule quanto tempo levará para quitar sua dívida do cartão de crédito e juros. Planeje sua estratégia de pagamento ideal.",
      slug: "/br/financeiro/simulador-de-cartao-de-credito",
      keywords: "calculadora cartão crédito, pagamento dívida, cartão crédito, quitação dívida, juros cartão, planejamento financeiro"
    },
    de: {
      title: "Tilgungsrechner – Ihre Rückzahlungs­berechnung online",
      description: "Der Tilgungsrechner berechnet Ihre Darlehens­rückzahlung und zeigt Ihnen, wie lange es dauert, Ihre Kreditkartenschulden abzubezahlen.",
      slug: "/de/finanziell/kreditkarten-tilgungsrechner",
      keywords: "Kreditkartenrechner, Schuldentilgung, Kreditkarte, Zinsen, Rückzahlungsplan, Schuldenmanagement"
    }
    ,
    es: {
      title: "Calculadora de pago de tarjeta: Reduce tu deuda rápido",
      description: "Calcula tus pagos de tarjeta de crédito y planifica la forma más rápida de reducir tu deuda. Toma el control de tus finanzas hoy mismo.",
      slug: "/es/financiero/calculadora-de-pago-de-tarjeta-de-credito",
      keywords: "calculadora, pago, tarjeta, reduce, deuda, rápido, calcula, pagos, crédito, planifica, forma, rápida, reducir, toma, control"
    }
  },
  'credit-card-calculator': {
    en: {
      title: "Credit Card Calculator",
      description: "Calculate your credit card payments, interest charges, and payoff timeline",
      slug: "/financial/credit-card-calculator",
      keywords: "credit, card, calculator, calculate, your, payments, interest, charges, payoff, timeline"
    },
    pl: {
      title: "Kalkulator Karty Kredytowej – Oblicz Koszty i Oprocentowanie",
      description: "Użyj kalkulatora karty kredytowej online, aby szybko obliczyć koszty, oprocentowanie i limity. Proste, dokładne i darmowe narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-karty-kredytowej",
      keywords: "kalkulator karty kredytowej, płatności kartowe, opłaty odsetkowe, harmonogram spłat, zarządzanie długiem"
    },
    br: {
      title: "Calculadora de Cartão de Crédito",
      description: "Calcule seus pagamentos do cartão de crédito, encargos de juros e cronograma de pagamento. Gerencie suas finanças com precisão.",
      slug: "/br/financeiro/calculadora-de-cartao-de-credito",
      keywords: "calculadora cartão crédito, pagamentos cartão, juros cartão crédito, fatura cartão, gestão financeira, análise cartão"
    },
    de: {
      title: "Kreditkartenrechner – Kosten & Konditionen einfach online prüfen",
      description: "Mit dem Kreditkartenrechner vergleichen Sie Gebühren, Zinsen und Tilgungspläne für Ihre Kreditkarte schnell und einfach.",
      slug: "/de/finanziell/kreditkartenrechner",
      keywords: "Kreditkartenrechner, Kartenzahlungen, Zinsen, Rückzahlungsplan, Finanzmanagement, Kreditkartenanalyse"
    }
    ,
    es: {
      title: "Calculadora de tarjetas de crédito: Controla tu deuda fácil",
      description: "Calcula tus pagos de tarjetas de crédito, conoce intereses y planifica tu deuda. Toma el control de tus finanzas y reduce tu carga financiera hoy mismo.",
      slug: "/es/financiero/calculadora-de-tarjetas-de-credito",
      keywords: "calculadora, tarjetas, crédito, controla, deuda, fácil, calcula, pagos, conoce, intereses, planifica, toma, control, finanzas, reduce"
    }
  },
  'annuity-payout-calculator': {
    en: {
      title: "Annuity Payout Calculator",
      description: "Calculate the payout amount for an annuity based on various factors",
      slug: "/financial/annuity-payout-calculator",
      keywords: "annuity, payout, calculator, calculate, amount, based, various, factors"
    },
    pl: {
      title: "Kalkulator Wypłaty Renty – Oblicz Wysokość Renty",
      description: "Użyj kalkulatora wypłaty renty online, aby obliczyć wysokość wypłaty renty na podstawie różnych czynników. Proste i dokładne narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-wyplaty-renty",
      keywords: "kalkulator renty, wypłata renty, wysokość renty, planowanie emerytury, dożywotnia renta"
    },
    br: {
      title: "Calculadora de Pagamento de Anuidade",
      description: "Calcule o valor do pagamento de uma anuidade considerando diversos fatores. Planeje sua renda vitalícia com precisão.",
      slug: "/br/financeiro/calculadora-de-pagamento-de-anuidade",
      keywords: "calculadora anuidade, pagamento anuidade, renda vitalícia, planejamento financeiro, aposentadoria, investimento longo prazo"
    },
    de: {
      title: "Rentenzahlung – Online Berechnung Ihrer Altersvorsorge",
      description: "Mit unserer Rentenzahlung-Berechnung ermitteln Sie einfach Ihre monatlichen Zahlungen aus Ihrer Leibrente oder Altersvorsorge.",
      slug: "/de/finanziell/rentenzahlung",
      keywords: "Rentenrechner, Rentenauszahlung, Leibrente, Ruhestandsplanung, langfristige Investitionen, Rentenberechnung"
    }
    ,
    es: {
      title: "Calculadora de pagos de anualidades: Planifica tu futuro hoy",
      description: "Calcula los pagos de tus anualidades fácilmente. Organiza tus ingresos futuros y toma decisiones financieras inteligentes para asegurar tu estabilidad hoy mismo.",
      slug: "/es/financiero/calculadora-de-pagos-de-anualidades",
      keywords: "calculadora, pagos, anualidades, planifica, futuro, calcula, fácilmente, organiza, ingresos, futuros, toma, decisiones, financieras, inteligentes, asegurar"
    }
  },
  'annuity-calculator': {
    en: {
      title: "Annuity Calculator",
      description: "Calculate the future value of an annuity based on regular contributions and interest rates",
      slug: "/financial/annuity-calculator",
      keywords: "annuity, calculator, calculate, future, value, based, regular, contributions, interest, rates"
    },
    pl: {
      title: "Kalkulator Renty Online – Oblicz Wysokość Swojej Renty",
      description: "Użyj kalkulatora renty online, aby szybko obliczyć wysokość renty, raty i okres wypłat. Proste, dokładne i darmowe narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-renty",
      keywords: "kalkulator renty, wartość przyszła, regularne składki, stopy procentowe, inwestycje rentowe"
    },
    br: {
      title: "Calculadora de Anuidades",
      description: "Calcule o valor futuro de uma anuidade com base em contribuições regulares e taxas de juros. Planeje seus investimentos a longo prazo.",
      slug: "/br/financeiro/calculadora-de-anuidades",
      keywords: "calculadora anuidade, valor futuro, contribuições regulares, taxas juros, investimento longo prazo, planejamento financeiro"
    },
    de: {
      title: "Rentenrechner – Ihre Altersrente online ermitteln",
      description: "Mit dem Rentenrechner berechnen Sie Ihre voraussichtliche Altersrente basierend auf regelmäßigen Beiträgen und Zinssätzen.",
      slug: "/de/finanziell/leibrentenrechner",
      keywords: "Rentenrechner, Zukunftswert, regelmäßige Beiträge, Zinssätze, langfristige Investitionen, Finanzplanung"
    }
    ,
    es: {
      title: "Calculadora de anualidad: Planifica pagos y ahorros hoy",
      description: "Calcula tus pagos de anualidad fácilmente. Organiza tus finanzas, proyecta tus ingresos y toma decisiones inteligentes para asegurar tu futuro financiero.",
      slug: "/es/financiero/calculadora-de-anualidad",
      keywords: "calculadora, anualidad, planifica, pagos, ahorros, calcula, fácilmente, organiza, finanzas, proyecta, ingresos, toma, decisiones, inteligentes, asegurar"
    }
  },
  'social-security-calculator': {
    en: {
      title: "Social Security Calculator",
      description: "Estimate your Social Security benefits based on your earnings history",
      slug: "/financial/social-security-calculator",
      keywords: "social, security, calculator, estimate, your, benefits, based, earnings, history"
    },
    pl: {
      title: "Kalkulator ZUS Online – Oblicz Składki i Koszty ZUS",
      description: "Użyj kalkulatora ZUS online, aby łatwo obliczyć składki, koszty i wynagrodzenie brutto-netto. Proste, dokładne i darmowe narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-zus",
      keywords: "kalkulator ZUS, świadczenia społeczne, historia zarobków, emerytury ZUS, planowanie emerytury"
    },
    br: {
      title: "Calculadora da Previdência Social",
      description: "Estime seus benefícios da Previdência Social com base em seu histórico de contribuições. Planeje sua aposentadoria com segurança.",
      slug: "/br/financeiro/simulador-da-previdencia",
      keywords: "calculadora previdência social, benefícios INSS, aposentadoria, histórico contribuições, planejamento aposentadoria"
    },
    de: {
      title: "Sozialversicherungsrechner – Beiträge online berechnen",
      description: "Mit dem Sozialversicherungsrechner ermitteln Sie Ihre Beiträge zu Kranken-, Renten- und Arbeitslosenversicherung basierend auf Ihrem Einkommen.",
      slug: "/de/finanziell/sozialversicherungsrechner",
      keywords: "social, security, calculator, estimate, your, benefits, based, earnings, history"
    }
    ,
    es: {
      title: "Calculadora de seguridad social: Estima tus beneficios hoy",
      description: "Calcula fácilmente tus beneficios de seguridad social. Planifica tu jubilación, conoce tus ingresos futuros y toma decisiones financieras inteligentes hoy.",
      slug: "/es/financiero/calculadora-de-seguridad-social",
      keywords: "calculadora, seguridad, social, estima, beneficios, calcula, fácilmente, planifica, jubilación, conoce, ingresos, futuros, toma, decisiones, financieras"
    }
  },
  'pension-calculator': {
    en: {
      title: "Pension Calculator",
      description: "Estimate your pension benefits based on salary and years of service",
      slug: "/financial/pension-calculator",
      keywords: "pension, calculator, estimate, your, benefits, based, salary, years, service"
    },
    pl: {
      title: "Kalkulator Emerytury – Oblicz Wysokość Emerytury Online",
      description: "Użyj kalkulatora emerytury online, aby obliczyć przyszłą emeryturę, składki i okres pracy. Proste, dokładne i darmowe narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-emerytury",
      keywords: "kalkulator emerytury, świadczenia emerytalne, pensja lata służby, planowanie przyszłości, dochody emerytalne"
    },
    br: {
      title: "Calculadora de Pensão",
      description: "Calcule seus benefícios de pensão com base no salário e anos de serviço. Planeje seu futuro financeiro com precisão.",
      slug: "/br/financeiro/calculadora-de-pensao",
      keywords: "calculadora pensão, benefícios aposentadoria, tempo serviço, cálculo pensão, planejamento aposentadoria, previdência"
    },
    de: {
      title: "Rentenrechner – Ihre Rentenplanung online berechnen",
      description: "Mit dem Rentenrechner berechnen Sie Ihre monatliche Rente basierend auf Gehalt und Dienstjahren für eine sichere Ruhestandsplanung.",
      slug: "/de/finanziell/pensionsrechner",
      keywords: "Pensionsrechner, Rentenleistungen, Dienstjahre, Pensionsberechnung, Ruhestandsplanung, Altersvorsorge"
    }
    ,
    es: {
      title: "Simulador de Pensiones – Calcula tu Pensión, Jubilación y Ahorro",
      description: "Utiliza nuestro simulador de pensiones para planificar tu jubilación, estimar tu pensión y optimizar tu ahorro de manera sencilla y precisa.",
      slug: "/es/financiero/simulador-de-pensiones",
      keywords: "simulador, pensiones, calcula, pensión, jubilación, ahorro, utiliza, nuestro, planificar, estimar, optimizar, manera, sencilla, precisa"
    }
  },
  'savings-calculator': {
    en: {
      title: "Savings Calculator",
      description: "Calculate your savings growth over time with regular contributions",
      slug: "/financial/savings-calculator",
      keywords: "savings, calculator, calculate, your, growth, over, time, regular, contributions"
    },
    pl: {
      title: "Kalkulator Oszczędności – Oblicz Swoje Oszczędności Online",
      description: "Użyj kalkulatora oszczędności online, aby obliczyć zyski, odsetki i plan oszczędzania. Proste, dokładne i darmowe narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-oszczednosci",
      keywords: "kalkulator oszczędności, wzrost oszczędności, regularne wpłaty, odsetki kapitałowe, planowanie finansowe"
    },
    br: {
      title: "Calculadora de Poupança",
      description: "Calcule o crescimento da sua poupança ao longo do tempo com contribuições regulares. Planeje seu futuro financeiro com inteligência.",
      slug: "/br/financeiro/calculadora-de-poupanca",
      keywords: "calculadora poupança, crescimento poupança, contribuições regulares, planejamento financeiro, economia, investimento"
    },
    de: {
      title: "Sparrechner – Ihr Tool für regelmäßiges Sparen",
      description: "Mit dem Sparrechner berechnen Sie Ihre monatliche Sparrate und sehen, wie Ihr Vermögen über die Zeit wächst.",
      slug: "/de/finanziell/sparrechner",
      keywords: "Sparrechner, Sparguthaben, regelmäßige Einzahlungen, Finanzplanung, Vermögensaufbau, Sparziele"
    }
    ,
    es: {
      title: "Calculadora de Ahorro – Optimiza tu Ahorro y Calcula Interés Compuesto",
      description: "Utiliza nuestra calculadora de ahorro para gestionar tu cuenta de ahorros, calcular el interés compuesto y planificar tus finanzas de manera eficiente y sencilla.",
      slug: "/es/financiero/calculadora-de-ahorro",
      keywords: "calculadora, ahorro, optimiza, calcula, interés, compuesto, utiliza, nuestra, gestionar, cuenta, ahorros, calcular, planificar, finanzas, manera"
    }
  },
  'marriage-calculator': {
    en: {
      title: "Marriage Calculator",
      description: "Evaluate the financial implications of marriage",
      slug: "/financial/marriage-calculator",
      keywords: "marriage, calculator, evaluate, financial, implications"
    },
    pl: {
      title: "Kalkulator Małżeński – Oblicz Podatek Małżeński Online",
      description: "Użyj kalkulatora małżeńskiego online, aby obliczyć wspólny podatek, dochody i ulgi. Proste, dokładne i darmowe narzędzie finansowe dla małżeństw.",
      slug: "/pl/finansowy/kalkulator-malzenski",
      keywords: "kalkulator małżeński, implikacje finansowe, wspólne podatki, korzyści podatkowe, finanse rodzinne"
    },
    br: {
      title: "Calculadora de Casamento",
      description: "Avalie as implicações financeiras do casamento. Planeje seu futuro financeiro em conjunto e tome decisões informadas.",
      slug: "/br/financeiro/calculadora-de-casamento",
      keywords: "calculadora casamento, finanças casal, planejamento financeiro, orçamento casamento, gastos conjuntos"
    },
    de: {
      title: "Hochzeitsrechner – Ihr Budget-Tool für die Traumhochzeit",
      description: "Mit dem Hochzeitsrechner planen Sie Ihr Hochzeitsbudget – Kosten für Gäste, Location, Catering und mehr im Überblick.",
      slug: "/de/finanziell/hochzeitsrechner",
      keywords: "Eherechner, Ehefinanzen, Finanzplanung, Hochzeitsbudget, gemeinsame Ausgaben, Finanzielle Eheplanung"
    }
    ,
    es: {
      title: "Calculadora de Matrimonio: Descubre tu Compatibilidad Hoy",
      description: "Usa nuestra calculadora de matrimonio y conoce tu compatibilidad con tu pareja al instante. ¡Descubre si están hechos el uno para el otra ahora!",
      slug: "/es/financiero/calculadora-de-matrimonio",
      keywords: "calculadora, matrimonio, descubre, compatibilidad, nuestra, conoce, pareja, instante, están, hechos, otra, ahora"
    }
  },
  'sales-tax-calculator': {
    en: {
      title: "Sales Tax Calculator",
      description: "Calculate sales tax for purchases based on local tax rates",
      slug: "/financial/sales-tax-calculator",
      keywords: "sales, tax, calculator, calculate, purchases, based, local, rates"
    },
    pl: {
      title: "Kalkulator Podatku VAT – Oblicz VAT Online",
      description: "Użyj kalkulatora podatku VAT online, aby obliczyć podatek od zakupów na podstawie lokalnych stawek. Proste i dokładne narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-podatku-vat",
      keywords: "kalkulator VAT, podatek sprzedaży, oblicz VAT, stawki podatkowe, podatek od zakupów"
    },
    br: {
      title: "Calculadora de Impostos sobre Vendas",
      description: "Calcule impostos sobre vendas para compras com base nas taxas locais. Planeje seus gastos com precisão incluindo impostos.",
      slug: "/br/financeiro/calculadora-de-impostos-sobre-vendas",
      keywords: "calculadora impostos vendas, ICMS, impostos compras, taxas locais, cálculo impostos, tributos vendas"
    },
    de: {
      title: "Mehrwertsteuerrechner",
      description: "Berechnen Sie die Mehrwertsteuer für Einkäufe basierend auf lokalen Steuersätzen. Planen Sie Ihre Ausgaben präzise mit Steuerberücksichtigung.",
      slug: "/de/finanziell/umsatz-steuer-calulcator-rechner",
      keywords: "Mehrwertsteuerrechner, MwSt-Rechner, Umsatzsteuer, Steuersätze, Steuerberechnung, Einkaufsplanung"
    }
    ,
    es: {
      title: "Calculadora del Impuesto sobre las Ventas – Calcula Rápido",
      description: "Calcula fácilmente el impuesto sobre las ventas con nuestra herramienta rápida y precisa. ¡Ahorra tiempo y evita errores ahora mismo!",
      slug: "/es/financiero/calculadora-del-impuesto-sobre-las-ventas",
      keywords: "calculadora, impuesto, sobre, ventas, calcula, rápido, fácilmente, nuestra, herramienta, rápida, precisa, ahorra, tiempo, evita, errores"
    }
  },
  'inflation-calculator': {
    en: {
      title: "Inflation Calculator",
      description: "Calculate the impact of inflation on purchasing power over time",
      slug: "/financial/inflation-calculator",
      keywords: "inflation, calculator, calculate, impact, purchasing, power, over, time"
    },
    pl: {
      title: "Kalkulator Inflacji – Oblicz Wartość Pieniądza Online",
      description: "Użyj kalkulatora inflacji online, aby sprawdzić spadek wartości pieniądza w czasie. Proste, szybkie i dokładne narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-inflacji",
      keywords: "kalkulator inflacji, wpływ inflacji, siła nabywcza, wartość pieniądza, zmiany cen"
    },
    br: {
      title: "Calculadora de Inflação",
      description: "Calcule o impacto da inflação no poder de compra ao longo do tempo. Entenda como seu dinheiro é afetado pela inflação.",
      slug: "/br/financeiro/calculadora-de-inflacao",
      keywords: "calculadora inflação, poder de compra, desvalorização moeda, impacto inflacionário, correção monetária"
    },
    de: {
      title: "Inflationsrechner – Kaufkraft & Preissteigerung online berechnen",
      description: "Mit dem Inflationsrechner ermitteln Sie Preissteigerung",
      slug: "/de/finanziell/inflationsrechner",
      keywords: "Inflationsrechner, Kaufkraft, Geldwert, Inflationsauswirkung, Geldentwertung, Wertverlust"
    }
    ,
    es: {
      title: "Calculadora de Inflación – Calcula el Valor Real y Poder Adquisitivo",
      description: "Utiliza nuestra calculadora de inflación para conocer el valor real de tu dinero, analizar el poder adquisitivo y planificar tus finanzas de manera precisa y sencilla.",
      slug: "/es/financiero/calculadora-de-inflacion",
      keywords: "calculadora, inflación, calcula, valor, real, poder, adquisitivo, utiliza, nuestra, conocer, dinero, analizar, planificar, finanzas, manera"
    }
  },
  'rent-calculator': {
    en: {
      title: "Rent Calculator",
      description: "Calculate your monthly rent payments and affordability",
      slug: "/financial/rent-calculator",
      keywords: "rent, calculator, calculate, your, monthly, payments, affordability"
    },
    pl: {
      title: "Kalkulator Czynszu – Oblicz Wysokość Czynszu Online",
      description: "Użyj kalkulatora czynszu online, aby obliczyć miesięczne opłaty, koszty najmu i zaliczki. Proste, dokładne i darmowe narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-czynszu",
      keywords: "kalkulator czynszu, płatności najmu, dostępność mieszkania, koszty wynajmu, budżet mieszkaniowy"
    },
    br: {
      title: "Calculadora de Aluguel",
      description: "Calcule seus pagamentos mensais de aluguel e sua capacidade de pagamento. Planeje seu orçamento habitacional com precisão.",
      slug: "/br/financeiro/calculadora-de-aluguel",
      keywords: "calculadora aluguel, pagamento mensal, capacidade pagamento, orçamento aluguel, planejamento moradia"
    },
    de: {
      title: "Mietrechner – Ihre Mietkosten online berechnen",
      description: "Mit dem Mietrechner berechnen Sie Ihre monatliche Miete",
      slug: "/de/finanziell/mietrechner",
      keywords: "Mietrechner, Mietzahlung, Erschwinglichkeit, Mietbudget, Wohnungsplanung, monatliche Miete"
    }
    ,
    es: {
      title: "Calculadora de Alquiler – Calcula Renta y Costos de tu Vivienda",
      description: "Utiliza nuestra calculadora de alquiler para estimar la renta, planificar los costos de tu vivienda y gestionar tu presupuesto de manera fácil y precisa.",
      slug: "/es/financiero/calculadora-de-alquiler",
      keywords: "calculadora, alquiler, calcula, renta, costos, vivienda, utiliza, nuestra, estimar, planificar, gestionar, presupuesto, manera, fácil, precisa"
    }
  },
  'interest-rate-calculator': {
    en: {
      title: "Interest Rate Calculator",
      description: "Calculate the impact of interest rates on loans and investments",
      slug: "/financial/interest-rate-calculator",
      keywords: "interest, rate, calculator, calculate, impact, rates, loans, investments"
    },
    pl: {
      title: "Kalkulator Stóp Procentowych – Oblicz Odsetki Online",
      description: "Użyj kalkulatora stóp procentowych online, aby obliczyć odsetki, oprocentowanie i zyski. Proste, szybkie i darmowe narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-stop-procentowych",
      keywords: "kalkulator stopy procentowej, wpływ odsetek, pożyczki inwestycje, oprocentowanie kredytu"
    },
    br: {
      title: "Calculadora de Taxa de Juros",
      description: "Calcule o impacto das taxas de juros em empréstimos e investimentos. Analise cenários financeiros com precisão.",
      slug: "/br/financeiro/calculadora-de-taxa-de-juros",
      keywords: "calculadora juros, taxa juros, empréstimos, investimentos, análise financeira, impacto juros"
    },
    de: {
      title: "Zinsrechner – Online Zinsen & Laufzeit exakt berechnen",
      description: "Mit dem Zinsrechner berechnen Sie Zinssatz",
      slug: "/de/finanziell/zinssatzrechner",
      keywords: "Zinsrechner, Zinssatz, Kredite, Investitionen, Finanzanalyse, Zinsberechnung"
    }
    ,
    es: {
      title: "Calculadora de Tasas de Interés – Calcula Fácil y Rápido",
      description: "Calcula tus tasas de interés al instante con nuestra herramienta fácil y precisa. ¡Ahorra tiempo y toma decisiones financieras inteligentes ahora!",
      slug: "/es/financiero/calculadora-de-tasas-de-interes",
      keywords: "calculadora, tasas, interés, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, ahorra, tiempo, toma, decisiones, financieras"
    }
  },
  'income-tax-calculator': {
    en: {
      title: "Income Tax Calculator",
      description: "Calculate your income tax based on various deductions and exemptions",
      slug: "/financial/income-tax-calculator",
      keywords: "income, tax, calculator, calculate, your, based, various, deductions, exemptions"
    },
    pl: {
      title: "Kalkulator Podatku Dochodowego – Oblicz Podatek Online",
      description: "Użyj kalkulatora podatku dochodowego online, aby obliczyć należny podatek, ulgi i dochód netto. Proste, dokładne i darmowe narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-podatku-dochodowego",
      keywords: "kalkulator podatku dochodowego, odliczenia podatkowe, zwolnienia podatkowe, obliczenia PIT, podatek dochodowy"
    },
    br: {
      title: "Calculadora de Imposto de Renda",
      description: "Calcule seu imposto de renda com base em várias deduções e isenções. Planeje sua declaração com precisão.",
      slug: "/br/financeiro/calculadora-de-imposto-de-renda",
      keywords: "calculadora IR, imposto renda, deduções IR, isenções, declaração imposto, IRPF"
    },
    de: {
      title: "Einkommensteuerrechner",
      description: "Berechnen Sie Ihre Einkommensteuer basierend auf verschiedenen Abzügen und Freibeträgen. Planen Sie Ihre Steuererklärung.",
      slug: "/de/finanziell/einkommen-steuer-rechner",
      keywords: "Einkommensteuerrechner, Steuerberechnung, Steuerabzüge, Freibeträge, Steuererklärung, ESt"
    }
    ,
    es: {
      title: "Calculadora de Impuesto sobre la Renta – Calcula tu Renta y Declaración",
      description: "Utiliza nuestra calculadora de impuesto sobre la renta para estimar tus impuestos, planificar tu declaración y gestionar tu renta de manera precisa y sencilla.",
      slug: "/es/financiero/calculadora-de-impuesto-sobre-la-renta",
      keywords: "calculadora, impuesto, sobre, renta, calcula, declaración, utiliza, nuestra, estimar, impuestos, planificar, gestionar, manera, precisa, sencilla"
    }
  },
  'salary-calculator': {
    en: {
      title: "Salary Calculator",
      description: "Calculate your take-home pay after taxes and deductions",
      slug: "/financial/salary-calculator",
      keywords: "salary, calculator, calculate, your, takehome, pay, after, taxes, deductions"
    },
    pl: {
      title: "Kalkulator Wynagrodzeń – Oblicz Pensję Netto i Brutto",
      description: "Użyj kalkulatora wynagrodzeń online, aby obliczyć pensję netto, brutto i składki ZUS. Proste, szybkie i dokładne narzędzie finansowe dla pracowników.",
      slug: "/pl/finansowy/kalkulator-wynagrodzen",
      keywords: "kalkulator wynagrodzeń, pensja netto, po podatkach, potrącenia składki, wynagrodzenie brutto"
    },
    br: {
      title: "Calculadora de Salário",
      description: "Calcule seu salário líquido após impostos e deduções. Planeje seu orçamento mensal com precisão.",
      slug: "/br/financeiro/calculadora-de-salario",
      keywords: "calculadora salário, salário líquido, deduções salariais, impostos salário, rendimento líquido"
    },
    de: {
      title: "Gehaltsrechner – Ihr Brutto-Netto-Tool online",
      description: "Mit dem Gehaltsrechner ermitteln Sie schnell Brutto- und Nettogehalt",
      slug: "/de/finanziell/gehaltsrechner",
      keywords: "Gehaltsrechner, Nettogehalt, Lohnabzüge, Lohnsteuer, Gehaltsabrechnung, Nettolohn"
    }
    ,
    es: {
      title: "Calculadora de Salario – Calcula tu Sueldo e Ingreso",
      description: "Utiliza nuestra calculadora de salario para estimar tu sueldo, controlar tus ingresos y planificar tus finanzas de manera rápida y sencilla.",
      slug: "/es/financiero/calculadora-de-salario",
      keywords: "calculadora, salario, calcula, sueldo, ingreso, utiliza, nuestra, estimar, controlar, ingresos, planificar, finanzas, manera, rápida, sencilla"
    }
  },
  'loan-calculator': {
    en: {
      title: "Loan Calculator",
      description: "Calculate loan payments, interest rates, and payoff schedules",
      slug: "/financial/loan-calculator",
      keywords: "loan, calculator, calculate, payments, interest, rates, payoff, schedules"
    },
    pl: {
      title: "Kalkulator Kredytowy – Oblicz Ratę Kredytu Online",
      description: "Użyj kalkulatora kredytowego online, aby obliczyć raty, odsetki i całkowity koszt kredytu. Proste, dokładne i darmowe narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-kredytowy",
      keywords: "kalkulator kredytowy, raty odsetki, harmonogramy spłaty, online kredyt, narzędzie planowania, kalkulator budżetu, darmowe narzędzie kredyt, obliczenia odsetek"
    },
    br: {
      title: "Calculadora de Empréstimo",
      description: "Calcule pagamentos de empréstimos, taxas de juros e cronogramas de quitação. Planeje suas finanças com precisão.",
      slug: "/br/financeiro/calculadora-de-emprestimo",
      keywords: "calculadora empréstimo, financiamento, prestações, juros, quitação, planejamento financeiro"
    },
    de: {
      title: "Kreditrechner – Ihre Online-Kreditberechnung",
      description: "Mit dem Kreditrechner berechnen Sie Zinsen",
      slug: "/de/finanziell/kreditrechner",
      keywords: "Kreditrechner, Kreditraten, Zinssätze, Tilgungsplan, Darlehen, Finanzierung"
    },
    es: {
      title: "Calculadora de Préstamos – Calcula tu Crédito y Amortización",
      description: "Utiliza nuestra calculadora de préstamos para planificar tu crédito, calcular la amortización y gestionar tus finanzas de manera rápida y eficiente.",
      slug: "/es/financiero/calculadora-de-prestamos",
      keywords: "calculadora, préstamos, calcula, crédito, amortización, utiliza, nuestra, planificar, calcular, gestionar, finanzas, manera, rápida, eficiente"
    }
  },
  'compound-interest-calculator': {
    en: {
      title: "Compound Interest Calculator",
      description: "Calculate compound interest growth over time with regular contributions",
      slug: "/financial/compound-interest-calculator",
      keywords: "compound, interest, calculator, calculate, growth, over, time, regular, contributions"
    },
    pl: {
      title: "Kalkulator Procentu Składanego – Oblicz Zysk Online",
      description: "Użyj kalkulatora procentu składanego online, aby obliczyć zysk z inwestycji i odsetki. Proste, szybkie i dokładne narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-procentu-skladanego",
      keywords: "kalkulator procentu składanego, odsetki składane, wzrost inwestycji, kapitalizacja odsetek, zyski inwestycyjne"
    },
    br: {
      title: "Calculadora de Juros Compostos",
      description: "Calcule o crescimento dos juros compostos ao longo do tempo com contribuições regulares. Maximize seus investimentos.",
      slug: "/br/financeiro/calculadora-de-juros-compostos",
      keywords: "calculadora juros compostos, crescimento investimento, contribuições regulares, rendimento acumulado"
    },
    de: {
      title: "Zinseszinsrechner",
      description: "Berechnen Sie, wie Ihre Investitionen durch Zinseszinsen im Laufe der Zeit wachsen.",
      slug: "/de/finanziell/zinseszinsrechner",
      keywords: "Zinseszinsrechner, Zinseszins, Investitionswachstum, Sparrechner, Zinsen berechnen"
    },
    es: {
      title: "Calculadora de Interés Compuesto – Calcula Capitalización y Valor Futuro",
      description: "Utiliza nuestra calculadora de interés compuesto para estimar la capitalización de tu dinero, proyectar el valor futuro y optimizar tus inversiones de manera sencilla y precisa.",
      slug: "/es/financiero/calculadora-de-interes-compuesto",
      keywords: "calculadora, interés, compuesto, calcula, capitalización, valor, futuro, utiliza, nuestra, estimar, dinero, proyectar, optimizar, inversiones, manera"
    }
  },
  'interest-calculator': {
    en: {
      title: "Interest Calculator",
      description: "Calculate investment growth, interest, and buying power after inflation.",
      slug: "/financial/interest-calculator",
      keywords: "interest, calculator, calculate, investment, growth, buying, power, after, inflation"
    },
    pl: {
      title: "Kalkulator Odsetek – Oblicz Odsetki od Kwoty Online",
      description: "Użyj kalkulatora odsetek online, aby obliczyć odsetki od kwoty, kredytu lub zaległości. Proste, dokładne i darmowe narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-odsetek",
      keywords: "kalkulator odsetek, odsetki kwota, kredyt zaległości, obliczenia procentowe, koszt pożyczki"
    },
    br: {
      title: "Calculadora de Juros",
      description: "Calcule o crescimento do investimento, juros e poder de compra após a inflação. Analise seus rendimentos.",
      slug: "/br/financeiro/calculadora-de-juros",
      keywords: "calculadora juros, crescimento investimento, poder compra, inflação, rendimento real"
    },
    de: {
      title: "Zinsrechner – Zinsen & Laufzeit online ermitteln",
      description: "Mit dem Zinsrechner berechnen Sie Zinssatz",
      slug: "/de/finanziell/zinsrechner",
      keywords: "Zinsrechner, Anlagewachstum, Kaufkraft, Inflation, reale Rendite"
    }
    ,
    es: {
      title: "Cálculo de Intereses – Calcula Interés, Tasa y Tiempo",
      description: "Utiliza nuestra herramienta de cálculo de intereses para estimar el interés generado, analizar la tasa de interés y planificar el tiempo de tus inversiones o préstamos de manera precisa.",
      slug: "/es/financiero/calculo-de-intereses",
      keywords: "cálculo, intereses, calcula, interés, tasa, tiempo, utiliza, nuestra, herramienta, estimar, generado, analizar, planificar, inversiones, préstamos"
    }
  },
  'payment-calculator': {
    en: {
      title: "Payment Calculator",
      description: "Calculate loan payments for fixed terms or determine loan terms for fixed payments",
      slug: "/financial/payment-calculator",
      keywords: "payment, calculator, calculate, loan, payments, fixed, terms, determine"
    },
    pl: {
      title: "Kalkulator Płatności – Oblicz Raty i Harmonogram Spłat",
      description: "Użyj kalkulatora płatności online, aby obliczyć raty kredytu, harmonogram spłat i koszty finansowania. Proste, szybkie i darmowe narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-platnosci",
      keywords: "kalkulator płatności, raty kredytu, harmonogram spłat, koszty finansowania"
    },
    br: {
      title: "Calculadora de Pagamento",
      description: "Calcule prestações de empréstimos para prazos fixos ou determine o prazo do empréstimo para pagamentos fixos. Ideal para simular opções de crédito.",
      slug: "/br/financeiro/calculadora-de-pagamento",
      keywords: "calculadora pagamento, parcelas empréstimo, prazo empréstimo, simulação crédito, cálculo prestações"
    },
    de: {
      title: "Zahlungsrechner – Ihre Zahlungen online berechnen",
      description: "Mit dem Zahlungsrechner berechnen Sie Ihre geplanten Zahlungen",
      slug: "/de/finanziell/zahlungsrechner",
      keywords: "Ratenrechner, Kreditraten, Laufzeit berechnen, Tilgungsrate, Kreditvergleich"
    }
    ,
    es: {
      title: "Calculadora de Pago – Calcula tu Salario y Ahorros Rápido",
      description: "Usa nuestra calculadora de pago para conocer tu salario neto y ahorros fácilmente. ¡Calcula al instante y planifica tu dinero hoy mismo!",
      slug: "/es/financiero/calculadora-de-pago",
      keywords: "calculadora, pago, calcula, salario, ahorros, rápido, nuestra, conocer, neto, fácilmente, instante, planifica, dinero, mismo"
    }
  },
  'auto-loan-calculator': {
    en: {
      title: "Auto Loan Calculator",
      description: "Calculate car loan payments and total cost",
      slug: "/financial/auto-loan-calculator",
      keywords: "auto, loan, calculator, calculate, car, payments, total, cost"
    },
    pl: {
      title: "Kalkulator Kredytu Samochodowego – Oblicz Ratę Online",
      description: "Użyj kalkulatora kredytu samochodowego online, aby obliczyć raty, odsetki i całkowity koszt auta. Proste, szybkie i darmowe narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-kredytu-samochodowego",
      keywords: "kalkulator kredytu samochodowego, raty miesięczne, finansowanie auta, kredyt na samochód, koszty zakupu"
    },
    br: {
      title: "Calculadora de Financiamento de Veículo",
      description: "Calcule as parcelas de financiamento de carro e o custo total. Planeje a compra do seu veículo com precisão.",
      slug: "/br/financeiro/calculadora-de-financiamento-de-veiculo",
      keywords: "calculadora financiamento carro, empréstimo auto, parcelas veículo, custo total carro"
    },
    de: {
      title: "Autokreditrechner – Online Auto-Finanzierung berechnen",
      description: "Mit dem Autokreditrechner ermitteln Sie Ihre monatliche Rate",
      slug: "/de/finanziell/autokreditrechner",
      keywords: "auto, loan, calculator, calculate, car, payments, total, cost"
    }
    ,
    es: {
      title: "Calculadora de Préstamos de Auto – Calcula tu Pago Fácil",
      description: "Calcula tu préstamo de auto al instante y conoce tus pagos mensuales. ¡Ahorra tiempo y planifica tu compra de manera inteligente ahora!",
      slug: "/es/financiero/calculadora-de-prestamos-de-auto",
      keywords: "calculadora, préstamos, auto, calcula, pago, fácil, préstamo, instante, conoce, pagos, mensuales, ahorra, tiempo, planifica, compra"
    }
  },
  'amortization-calculator': {
    en: {
      title: "Amortization Calculator",
      description: "Generate detailed amortization schedules for loans",
      slug: "/financial/amortization-calculator",
      keywords: "amortization, calculator, generate, detailed, schedules, loans"
    },
    pl: {
      title: "Kalkulator Amortyzacji – Oblicz Amortyzację Online",
      description: "Użyj kalkulatora amortyzacji online, aby obliczyć koszt i wartość środka trwałego. Proste, dokładne i darmowe narzędzie finansowe dla firm.",
      slug: "/pl/finansowy/kalkulator-amortyzacji",
      keywords: "kalkulator amortyzacji, harmonogram spłat, spłata kapitału, odsetki kredytu, plan amortyzacji"
    },
    br: {
      title: "Calculadora de Amortização",
      description: "Gere cronogramas de amortização detalhados para empréstimos e visualize pagamentos de juros e principal ao longo do tempo.",
      slug: "/br/financeiro/calculadora-de-amortizacao",
      keywords: "calculadora amortização, cronograma amortização, tabela amortização, pagamentos principal, juros empréstimo"
    },
    de: {
      title: "Tilgungsrechner – Darlehen & Rückzahlung online berechnen",
      description: "Berechnen Sie mit dem Tilgungsrechner Ihre monatliche Rate",
      slug: "/de/finanziell/tilgungsrechner",
      keywords: "Tilgungsrechner, Tilgungsplan, Amortisation, Kreditraten, Zinsanteil, Tilgungsanteil"
    }
    ,
    es: {
      title: "Calculadora de Amortización – Calcula Pagos Fácilmente",
      description: "Calcula tu amortización al instante y conoce tus pagos mensuales. ¡Planifica tu préstamo de forma sencilla y toma decisiones financieras inteligentes",
      slug: "/es/financiero/calculadora-de-amortizacion",
      keywords: "calculadora, amortización, calcula, pagos, fácilmente, instante, conoce, mensuales, planifica, préstamo, forma, sencilla, toma, decisiones, financieras"
    }
  },
  'mortgage-payoff-calculator': {
    en: {
      title: "Mortgage Payoff Calculator",
      description: "Calculate your mortgage payoff date and total interest savings",
      slug: "/financial/mortgage-payoff-calculator",
      keywords: "mortgage, payoff, calculator, calculate, your, date, total, interest, savings"
    },
    pl: {
      title: "Kalkulator Spłaty Kredytu Hipotecznego – Oblicz Ratę",
      description: "Użyj kalkulatora spłaty kredytu hipotecznego online, aby obliczyć raty, odsetki i całkowity koszt. Proste, dokładne i darmowe narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-splaty-kredytu-hipotecznego",
      keywords: "spłata hipoteki, wcześniejsza spłata, oszczędności odsetek, data spłaty, dodatkowe wpłaty"
    },
    br: {
      title: "Calculadora de Quitação da Hipoteca",
      description: "Calcule a data de quitação da hipoteca e economia total de juros ao pagar antecipadamente ou fazer pagamentos extras.",
      slug: "/br/financeiro/calculadora-de-quitacao-da-hipoteca",
      keywords: "quitação hipoteca, pagar hipoteca antes, economia juros, data quitação, amortização extra"
    },
    de: {
      title: "Hypothekentilgungsrechner",
      description: "Berechnen Sie Ihr Hypothekentilgungsdatum und die gesamten Zinseinsparungen durch Sondertilgungen oder vorzeitige Rückzahlung.",
      slug: "/de/finanziell/hypotheken-ruckzahlung-rechner",
      keywords: "Hypothek tilgen, vorzeitige Tilgung, Zinseinsparungen, Tilgungsdatum, Sondertilgung"
    }
    ,
    es: {
      title: "Calculadora de Liquidación de Hipotecas – Calcula Fácil",
      description: "Calcula la liquidación de tu hipoteca al instante y conoce tus pagos finales. ¡Ahorra tiempo y planifica tu deuda de manera inteligente ahora!",
      slug: "/es/financiero/calculadora-de-liquidacion-de-hipotecas",
      keywords: "calculadora, liquidación, hipotecas, calcula, fácil, hipoteca, instante, conoce, pagos, finales, ahorra, tiempo, planifica, deuda, manera"
    }
  },
  'currency-calculator': {
    en: {
      title: "Currency Calculator",
      description: "Convert between different currencies with real-time rates",
      slug: "/financial/currency-calculator",
      keywords: "currency, calculator, convert, between, different, currencies, realtime, rates"
    },
    pl: {
      title: "Kalkulator Walutowy – Przelicz Waluty Online Szybko",
      description: "Użyj kalkulatora walutowego online, aby szybko przeliczyć kursy i wartości walut. Proste, dokładne i darmowe narzędzie finansowe do konwersji.",
      slug: "/pl/finansowy/kalkulator-walutowy",
      keywords: "kalkulator walutowy, wymiana walut, kursy wymiany, przelicznik walut, handel forex"
    },
    br: {
      title: "Conversor de Moedas",
      description: "Converta entre diferentes moedas com taxas em tempo real. Ferramenta útil para viagens e negócios internacionais.",
      slug: "/br/financeiro/calculadora-de-moedas",
      keywords: "conversor moeda, taxa câmbio, cotação em tempo real, conversão dólar, euro, câmbio"
    },
    de: {
      title: "Währungsrechner – Online Währungsumtausch einfach gemacht",
      description: "Mit dem Währungsrechner berechnen Sie live Wechselkurse zwischen Währungen. Nutzen Sie den Währungsrechner",
      slug: "/de/finanziell/wahrungsrechner",
      keywords: "Währungsrechner, Wechselkurs, Echtzeitkurse, Währung konvertieren, Devisen"
    }
    ,
    es: {
      title: "Conversor de Divisas – Convierte Monedas al Instante",
      description: "Utiliza nuestro conversor de divisas para convertir monedas, conocer el cambio actual y gestionar tus transacciones internacionales de manera rápida y sencilla.",
      slug: "/es/financiero/conversor-de-divisas",
      keywords: "conversor, divisas, convierte, monedas, instante, utiliza, nuestro, convertir, conocer, cambio, actual, gestionar, transacciones, internacionales, manera"
    }
  },
  'bank-statement-converter': {
    en: {
      title: "Bank Statement Converter - Convert Any Bank Statement to CSV",
      description: "Convert any bank statement (PDF, Excel, CSV) from any country or bank into standardized CSV format. Supports all currencies, date formats, and statement layouts.",
      slug: "/financial/bank-statement-converter",
      keywords: "bank statement converter, PDF to CSV, bank statement parser, financial data extraction, statement converter, normalize bank data, convert bank statement, financial tools"
    }
  },
  'investment-calculator': {
    en: {
      title: "Investment Calculator",
      description: "Calculate investment returns and growth projections",
      slug: "/financial/investment-calculator",
      keywords: "investment, calculator, calculate, returns, growth, projections"
    },
    pl: {
      title: "Kalkulator Inwestycyjny – Oblicz Zysk z Inwestycji",
      description: "Użyj kalkulatora inwestycyjnego online, aby obliczyć zyski, odsetki i zwrot z inwestycji. Proste, dokładne i darmowe narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-inwestycyjny",
      keywords: "kalkulator inwestycyjny, zwrot inwestycji, wzrost kapitału, planowanie inwestycji, zyski inwestycyjne"
    },
    br: {
      title: "Calculadora de Investimentos",
      description: "Calcule retornos de investimento e projeções de crescimento com diferentes cenários de contribuição e taxas.",
      slug: "/br/financeiro/calculadora-de-investimentos",
      keywords: "calculadora investimento, retorno investimento, projeção crescimento, análise investimento, taxa retorno"
    },
    de: {
      title: "Investitionsrechner – Rendite & Wachstum online berechnen",
      description: "Mit dem Investitionsrechner ermitteln Sie Rendite",
      slug: "/de/finanziell/investitionsrechner",
      keywords: "Investmentrechner, Renditeberechnung, Wachstumsprognose, Anlageanalyse"
    }
    ,
    es: {
      title: "Calculadora de Inversiones – Calcula Rendimiento y Capital",
      description: "Utiliza nuestra calculadora de inversiones para planificar tu inversión, estimar el rendimiento y gestionar tu capital de manera eficiente y sencilla.",
      slug: "/es/financiero/calculadora-de-inversiones",
      keywords: "calculadora, inversiones, calcula, rendimiento, capital, utiliza, nuestra, planificar, inversión, estimar, gestionar, manera, eficiente, sencilla"
    }
  },
  'retirement-calculator': {
    en: {
      title: "Retirement Calculator",
      description: "Plan your retirement savings and calculate required contributions",
      slug: "/financial/retirement-calculator",
      keywords: "retirement, calculator, plan, your, savings, calculate, required, contributions"
    },
    pl: {
      title: "Kalkulator Emerytalny – Oblicz Swoją Emeryturę Online",
      description: "Użyj kalkulatora emerytalnego online, aby obliczyć przyszłą emeryturę, składki i oszczędności. Proste, dokładne i darmowe narzędzie finansowe.",
      slug: "/pl/finansowy/kalkulator-emerytalny",
      keywords: "kalkulator emerytalny, planowanie emerytury, oszczędności emerytalne, dochody emerytalne, przyszłość finansowa"
    },
    br: {
      title: "Calculadora de Aposentadoria",
      description: "Planeje sua poupança para aposentadoria e calcule as contribuições necessárias para alcançar suas metas financeiras.",
      slug: "/br/financeiro/calculadora-de-aposentadoria",
      keywords: "calculadora aposentadoria, planejamento aposentadoria, contribuições necessárias, metas de aposentadoria"
    },
    de: {
      title: "Rentenrechner – Ihre zukünftige Rente berechnen",
      description: "Mit dem Rentenrechner ermitteln Sie Ihre voraussichtliche Altersrente",
      slug: "/de/finanziell/altersrentenrechner",
      keywords: "Rentenplanung, Altersvorsorge, erforderliche Beiträge, Rentenziel, Altersvorsorgeplanung"
    }
    ,
    es: {
      title: "Simulador de Jubilación – Planifica tu Pensión y Ahorro",
      description: "Utiliza nuestro simulador de jubilación para calcular tu pensión futura, estimar el ahorro necesario y planificar tu retiro de manera sencilla y efectiva.",
      slug: "/es/financiero/simulador-de-jubilacion",
      keywords: "simulador, jubilación, planifica, pensión, ahorro, utiliza, nuestro, calcular, futura, estimar, necesario, planificar, retiro, manera, sencilla"
    }
  },
  'bmi-calculator': {
    en: {
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index and understand your weight status",
      slug: "/health/bmi-calculator",
      keywords: "bmi, calculator, calculate, your, body, mass, index, understand, weight, status"
    },
    pl: {
      title: "Kalkulator BMI – Oblicz Swoje BMI Online Szybko",
      description: "Użyj kalkulatora BMI online, aby obliczyć wskaźnik masy ciała i sprawdzić swoją wagę idealną. Proste, dokładne i darmowe narzędzie zdrowotne.",
      slug: "/pl/zdrowie/kalkulator-bmi",
      keywords: "BMI, wskaźnik masy ciała, zdrowa waga, nadwaga, otyłość, oblicz BMI"
    },
    br: {
      title: "Calculadora de IMC",
      description: "Calcule seu Índice de Massa Corporal (IMC) e entenda sua categoria de peso (baixo, saudável, sobrepeso, obesidade).",
      slug: "/br/saude/calculadora-imc",
      keywords: "calculadora IMC, índice massa corporal, peso saudável, sobrepeso, obesidade, saúde"
    },
    de: {
      title: "BMI-Rechner",
      description: "Berechnen Sie Ihren Body-Mass-Index (BMI) und finden Sie Ihr gesundes Gewicht.",
      slug: "/de/gesundheit/bmi-rechner",
      keywords: "BMI-Rechner, Body-Mass-Index, gesundes Gewicht, Übergewicht, Untergewicht, BMI berechnen"
    },
    es: {
      title: "Calculadora IMC – Evalúa tu Peso y Altura",
      description: "Utiliza nuestra calculadora IMC para medir tu índice de masa corporal, analizar tu peso y altura, y mejorar tu salud de manera sencilla y efectiva.",
      slug: "/es/salud/calculadora-IMC",
      keywords: "calculadora, evalúa, peso, altura, utiliza, nuestra, medir, índice, masa, corporal, analizar, mejorar, salud, manera, sencilla"
    }
  },
  'pregnancy-weight-gain-calculator': {
    en: {
      title: "Pregnancy Weight Gain Calculator",
      description: "Calculate your recommended weight gain during pregnancy",
      slug: "/health/pregnancy-weight-gain-calculator",
      keywords: "pregnancy, weight, gain, calculator, calculate, your, recommended, during"
    },
    pl: {
      title: "Kalkulator Przyrostu Wagi w Ciąży – Oblicz Online",
      description: "Użyj kalkulatora przyrostu wagi w ciąży online, aby obliczyć zalecany przyrost wagi podczas ciąży. Proste i dokładne narzędzie dla przyszłych mam.",
      slug: "/pl/zdrowie/kalkulator-przyrostu-wagi-w-ciazy",
      keywords: "przyrost wagi ciąża, waga w ciąży, BMI przed ciążą, zdrowie ciężarnej, zalecany przyrost"
    },
    br: {
      title: "Calculadora de Ganho de Peso na Gravidez",
      description: "Calcule o ganho de peso recomendado durante a gravidez com base no IMC pré-gestacional e orientações médicas.",
      slug: "/br/saude/calculadora-de-ganho-de-peso-na-gravidez",
      keywords: "ganho de peso gravidez, peso gestacional, IMC pré-gestacional, saúde gestante, ganho saudável"
    },
    de: {
      title: "Schwangerschaft Gewichtszunahme – Rechner online nutzen",
      description: "Berechnen Sie Ihre gesunde Gewichtszunahme in der Schwangerschaft mit unserem Tool. Der Schwangerschaft Gewichtszunahme Rechner zeigt Ihnen Grenzwerte & Trends.",
      slug: "/de/gesundheit/schwangerschaft-gewichtszunahme-rechner",
      keywords: "Gewichtszunahme Schwangerschaft, gesunde Gewichtszunahme, BMI vor Schwangerschaft, Schwangerschaftsberatung"
    }
    ,
    es: {
      title: "Calculadora de Aumento de Peso en Embarazo – Fácil y Rápido",
      description: "Calcula tu aumento de peso durante el embarazo al instante y lleva un control saludable. ¡Descubre si estás en el rango ideal ahora mismo!",
      slug: "/es/salud/calculadora-de-aumento-de-peso-durante-el-embarazo",
      keywords: "calculadora, aumento, peso, embarazo, fácil, rápido, calcula, durante, instante, lleva, control, saludable, descubre, estás, rango"
    }
  },
  'calories-burned-calculator': {
    en: {
      title: "Calories Burned Calculator",
      description: "Estimate the number of calories burned during physical activities.",
      slug: "/health/calories-burned-calculator",
      keywords: "calories, burned, calculator, estimate, number, during, physical, activities"
    },
    pl: {
      title: "Kalkulator Spalonych Kalorii – Oblicz Kalorie Online",
      description: "Użyj kalkulatora spalonych kalorii online, aby oszacować liczbę spalonych kalorii podczas aktywności fizycznej. Proste i dokładne narzędzie fitness.",
      slug: "/pl/zdrowie/kalkulator-spalonych-kalorii",
      keywords: "spalanie kalorii, kalorie spalane, aktywność fizyczna, oblicz kalorie, utrata wagi"
    },
    br: {
      title: "Calculadora de Calorias Queimadas",
      description: "Estime o número de calorias queimadas durante atividades físicas com base na intensidade, duração e peso corporal.",
      slug: "/br/saude/calculadora-de-calorias-queimadas",
      keywords: "calorias queimadas, gasto calórico, atividade física, cálculo calorias, perda peso"
    },
    de: {
      title: "Kalorienverbrauchsrechner",
      description: "Schätzen Sie die während körperlicher Aktivitäten verbrannten Kalorien basierend auf Intensität, Dauer und Körpergewicht.",
      slug: "/de/gesundheit/kalorien-verbrauch-rechner",
      keywords: "Kalorienverbrauch, verbrannte Kalorien, Aktivität Kalorien, Gewichtsverlust, Fitness"
    }
    ,
    es: {
      title: "Calculadora de Calorías Quemadas – Calcula Fácil y Rápido",
      description: "Calcula las calorías quemadas al instante con nuestra herramienta precisa. ¡Optimiza tu entrenamiento y alcanza tus metas fitness ahora mismo",
      slug: "/es/salud/calculadora-de-calorias-quemadas",
      keywords: "calculadora, calorías, quemadas, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, optimiza, entrenamiento, alcanza, metas, fitness"
    }
  },
  'due-date-calculator': {
    en: {
      title: "Due Date Calculator",
      description: "Estimate your due date based on your last menstrual period or conception date.",
      slug: "/health/due-date-calculator",
      keywords: "due, date, calculator, estimate, your, based, last, menstrual, period, conception"
    },
    pl: {
      title: "Kalkulator Terminu Porodu – Oblicz Datę Porodu Online",
      description: "Użyj kalkulatora terminu porodu online, aby dokładnie obliczyć przewidywaną datę porodu. Proste, szybkie i darmowe narzędzie dla przyszłych mam.",
      slug: "/pl/zdrowie/kalkulator-terminu-porodu",
      keywords: "termin porodu, data porodu, ciąża, ostatnia miesiączka, kalkulator ciąży"
    },
    br: {
      title: "Calculadora de Data Provável do Parto",
      description: "Estime a data provável do parto com base na data da última menstruação ou concepção. Informação útil para o acompanhamento pré-natal.",
      slug: "/br/saude/calculadora-data-de-vencimento",
      keywords: "data provável parto, calculadora gestacional, data parto, acompanhamento pré-natal"
    },
    de: {
      title: "Fristenrechner – Online Berechnung gesetzlicher Fristen",
      description: "Nutzen Sie den Fristenrechner zur exakten Berechnung von Kündigungs-",
      slug: "/de/gesundheit/fristenrechner",
      keywords: "Geburtstermin, Schwangerschaftsrechner, Entbindungstermin, Pränatale Betreuung"
    }
    ,
    es: {
      title: "Calculadora de Fecha de Vencimiento – Calcula Fácil y Rápido",
      description: "Calcula la fecha de vencimiento al instante con nuestra herramienta precisa. ¡Evita retrasos y organiza tus fechas importantes ahora mismo",
      slug: "/es/salud/calculadora-de-fecha-de-vencimiento",
      keywords: "calculadora, fecha, vencimiento, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, evita, retrasos, organiza, fechas, importantes"
    }
  },
  'pace-calculator': {
    en: {
      title: "Pace Calculator",
      description: "Calculate your running pace and speed",
      slug: "/health/pace-calculator",
      keywords: "pace, calculator, calculate, your, running, speed"
    },
    pl: {
      title: "Kalkulator Tempa – Oblicz Swoje Tempo Biegu Online",
      description: "Użyj kalkulatora tempa online, aby obliczyć swoje tempo biegu, czas i dystans. Proste, szybkie i darmowe narzędzie dla biegaczy i sportowców.",
      slug: "/pl/zdrowie/kalkulator-tempa",
      keywords: "tempo biegu, prędkość biegania, czas biegu, dystans, kalkulator biegowy"
    },
    br: {
      title: "Calculadora de Ritmo de Corrida",
      description: "Calcule seu ritmo e velocidade de corrida com base em distância e tempo. Ideal para treino e planejamento de provas.",
      slug: "/br/saude/calculadora-de-ritmo",
      keywords: "ritmo corrida, pace, velocidade corrida, treinamento corrida, planejamento provas"
    },
    de: {
      title: "Temporechner – Laufgeschwindigkeit & Pace online berechnen",
      description: "Berechnen Sie mit dem Temporechner Ihre Laufgeschwindigkeit",
      slug: "/de/gesundheit/temporechner",
      keywords: "Lauftempo, Pace Rechner, Geschwindigkeit, Training, Wettkampf"
    }
    ,
    es: {
      title: "Calculadora de Ritmos – Mide tu Tiempo y Distancia",
      description: "Utiliza nuestra calculadora de ritmos para calcular tus ritmos de ejercicio, medir el tiempo y la distancia recorrida, y mejorar tu rendimiento físico de manera sencilla.",
      slug: "/es/salud/calculadora-de-ritmos",
      keywords: "calculadora, ritmos, mide, tiempo, distancia, utiliza, nuestra, calcular, ejercicio, medir, recorrida, mejorar, rendimiento, físico, manera"
    }
  },
  'one-rep-max-calculator': {
    en: {
      title: "One Rep Max Calculator",
      description: "Estimate your one-rep max for strength training exercises.",
      slug: "/health/one-rep-max-calculator",
      keywords: "one, rep, max, calculator, estimate, your, onerep, strength, training, exercises"
    },
    pl: {
      title: "Kalkulator 1RM – Oblicz Maksymalne Obciążenie Online",
      description: "Użyj kalkulatora 1RM online, aby oszacować maksymalne obciążenie jednorazowe dla ćwiczeń siłowych. Proste i dokładne narzędzie treningowe.",
      slug: "/pl/zdrowie/kalkulator-1rm",
      keywords: "1RM, maksymalne obciążenie, trening siłowy, obciążenie jednorazowe, kalkulator siły"
    },
    br: {
      title: "Calculadora de 1RM (Uma Repetição Máxima)",
      description: "Estime sua carga máxima para uma repetição (1RM) em exercícios de força. Útil para programar treinos e progressão.",
      slug: "/br/saude/calculadora-de-uma-repeticao-maxima",
      keywords: "1RM, uma repetição máxima, força, treinamento, carga máxima, cálculo 1RM"
    },
    de: {
      title: "One-Rep-Max-Rechner",
      description: "Schätzen Sie Ihr One-Rep-Maximum (1RM) für Kraftübungen. Nützlich zur Trainingsplanung und Progression.",
      slug: "/de/gesundheit/ein-rap-rechner",
      keywords: "1RM Rechner, One-Rep-Max, Krafttraining, Trainingsplanung, Maximalkraft"
    }
    ,
    es: {
      title: "Calculadora de 1 Repetición Máxima – Calcula tu Fuerza",
      description: "Calcula tu repetición máxima al instante con nuestra herramienta precisa. ¡Optimiza tu entrenamiento y alcanza tus metas de fuerza ahora mismo",
      slug: "/es/salud/calculadora-de-una-repeticion-maxima",
      keywords: "calculadora, repetición, máxima, calcula, fuerza, instante, nuestra, herramienta, precisa, optimiza, entrenamiento, alcanza, metas, ahora, mismo"
    }
  },
  'army-body-fat-calculator': {
    en: {
      title: "Army Body Fat Calculator",
      description: "Calculate body fat percentage using the U.S. Army method.",
      slug: "/health/army-body-fat-calculator",
      keywords: "army, body, fat, calculator, calculate, percentage, using, method"
    },
    pl: {
      title: "Kalkulator Tłuszczu Ciała (Metoda Armii USA)",
      description: "Użyj kalkulatora tłuszczu ciała online wg metody Armii USA, aby obliczyć procent tłuszczu. Proste, dokładne i darmowe narzędzie fitness.",
      slug: "/pl/zdrowie/kalkulator-tluszczu-ciala-army",
      keywords: "procent tłuszczu ciała, metoda Army, skład ciała, kondycja fizyczna, pomiar tłuszczu"
    },
    br: {
      title: "Calculadora de Gordura Corporal (Método do Exército dos EUA)",
      description: "Calcule a porcentagem de gordura corporal usando o método do Exército dos EUA. Indicador usado para padrões de aptidão.",
      slug: "/br/saude/calculadora-de-gordura-corporal-do-exercito",
      keywords: "percentual gordura corporal, método exército, cálculo gordura, aptidão física, composição corporal"
    },
    de: {
      title: "Army Körperfett Rechner – Präzise Fettmessung Online",
      description: "Berechne dein Körperfett mit dem Army Körperfett Rechner. Schnelle & genaue Analyse für Männer und Frauen – einfach",
      slug: "/de/gesundheit/army-korperfettrechner",
      keywords: "Körperfettanteil, US Army Methode, Körperzusammensetzung, Fitnessbewertung"
    }
    ,
    es: {
      title: "Calculadora de Grasa Corporal del Ejército – Fácil y Rápida",
      description: "Calcula tu porcentaje de grasa corporal militar al instante. ¡Cumple con los estándares del ejército y optimiza tu entrenamiento ahora mismo",
      slug: "/es/salud/calculadora-de-grasa-corporal-del-ejercito",
      keywords: "calculadora, grasa, corporal, ejército, fácil, rápida, calcula, porcentaje, militar, instante, cumple, estándares, optimiza, entrenamiento, ahora"
    }
  },
  'target-heart-rate-calculator': {
    en: {
      title: "Target Heart Rate Calculator",
      description: "Calculate your target heart rate zone for exercise.",
      slug: "/health/target-heart-rate-calculator",
      keywords: "target, heart, rate, calculator, calculate, your, zone, exercise"
    },
    pl: {
      title: "Kalkulator Strefy Tętna Treningowego – Oblicz Online",
      description: "Użyj kalkulatora strefy tętna treningowego online, aby określić optymalną strefę tętna do ćwiczeń. Proste i dokładne narzędzie fitness.",
      slug: "/pl/zdrowie/kalkulator-strefy-tetna",
      keywords: "strefa tętna, tętno treningowe, cardio, tętno podczas ćwiczeń, trening"
    },
    br: {
      title: "Calculadora de Zona de Frequência Cardíaca Alvo",
      description: "Calcule sua zona-alvo de frequência cardíaca para exercícios com base na idade e condicionamento físico.",
      slug: "/br/saude/calculadora-de-frequencia-cardiaca-alvo",
      keywords: "frequência cardíaca alvo, zona treino, cardio, frequência cardíaca exercício, treinamento"
    },
    de: {
      title: "Herzfrequenz Rechner – Berechne deine ideale Pulsrate",
      description: "Finde mit dem Herzfrequenz Rechner deine optimale Pulsrate. Einfach online berechnen – für Training",
      slug: "/de/gesundheit/herzfrequenz-rechner",
      keywords: "Zielherzfrequenz, Trainingszone, Herzfrequenz, Cardio-Training"
    }
    ,
    es: {
      title: "Calculadora de Frecuencia Cardíaca Objetivo – Fácil y Rápida",
      description: "Calcula tu frecuencia cardíaca objetivo al instante con nuestra herramienta precisa. ¡Optimiza tu entrenamiento y alcanza tus metas fitness ahora mismo",
      slug: "/es/salud/calculadora-de-frecuencia-cardiaca-objetivo",
      keywords: "calculadora, frecuencia, cardíaca, objetivo, fácil, rápida, calcula, instante, nuestra, herramienta, precisa, optimiza, entrenamiento, alcanza, metas"
    }
  },
  'protein-calculator': {
    en: {
      title: "Protein Calculator",
      description: "Calculate your daily protein needs based on activity level and goals",
      slug: "/health/protein-calculator",
      keywords: "protein, calculator, calculate, your, daily, needs, based, activity, level, goals"
    },
    pl: {
      title: "Kalkulator Białka – Oblicz Dzienne Zapotrzebowanie Online",
      description: "Użyj kalkulatora białka online, aby obliczyć dzienne zapotrzebowanie na białko. Proste, dokładne i darmowe narzędzie dietetyczne.",
      slug: "/pl/zdrowie/kalkulator-bialka",
      keywords: "zapotrzebowanie na białko, spózycie białka, dzienne białko, budowa mięśni, dieta"
    },
    br: {
      title: "Calculadora de Proteína",
      description: "Calcule sua necessidade diária de proteína com base no nível de atividade e objetivos (manutenção, ganho muscular, perda de peso).",
      slug: "/br/saude/calculadora-de-proteina",
      keywords: "necessidade proteína, ingestão proteína, proteína diária, ganho muscular, dieta"
    },
    de: {
      title: "Protein-Rechner",
      description: "Berechnen Sie Ihren täglichen Proteinbedarf basierend auf Aktivitätsniveau und Zielen (Erhaltung, Muskelaufbau, Gewichtsverlust).",
      slug: "/de/gesundheit/protien-aufnahme-rechner",
      keywords: "Proteinbedarf, tägliche Proteinaufnahme, Muskelaufbau, Ernährung"
    }
    ,
    es: {
      title: "Calculadora de Proteínas – Calcula tu Ingesta Diaria Fácil",
      description: "Calcula tu ingesta diaria de proteínas al instante con nuestra herramienta precisa. ¡Optimiza tu dieta y alcanza tus metas de nutrición ahora mismo",
      slug: "/es/salud/calculadora-de-proteinas",
      keywords: "calculadora, proteínas, calcula, ingesta, diaria, fácil, instante, nuestra, herramienta, precisa, optimiza, dieta, alcanza, metas, nutrición"
    }
  },
  'healthy-weight-calculator': {
    en: {
      title: "Healthy Weight Calculator",
      description: "Calculate your healthy weight range based on height and gender",
      slug: "/health/healthy-weight-calculator",
      keywords: "healthy, weight, calculator, calculate, your, range, based, height, gender"
    },
    pl: {
      title: "Kalkulator Zdrowej Wagi – Oblicz Wagę Optymalną Online",
      description: "Użyj kalkulatora zdrowej wagi online, aby obliczyć zakres zdrowej wagi na podstawie wzrostu i płci. Proste, dokładne i darmowe narzędzie zdrowotne.",
      slug: "/pl/zdrowie/kalkulator-zdrowej-wagi",
      keywords: "zdrowa waga, zakres wagi, BMI, cel wagowy, zdrowie"
    },
    br: {
      title: "Calculadora de Peso Saudável",
      description: "Calcule a faixa de peso saudável com base na altura e sexo. Utilize como referência para metas de saúde.",
      slug: "/br/saude/calculadora-de-peso-saudavel",
      keywords: "peso saudável, faixa de peso, IMC, meta peso, saúde"
    },
    de: {
      title: "Gesundes Gewicht Rechner – Finde dein ideales Körpergewicht",
      description: "Berechne mit dem Gesundes Gewicht Rechner dein ideales Körpergewicht. Schnell",
      slug: "/de/gesundheit/gesundes-gewicht-rechner",
      keywords: "gesundes Gewicht, BMI, Gewichtsspanne, Gesundheitsziele"
    }
    ,
    es: {
      title: "Calculadora de Peso Saludable – Descubre tu IMC Ideal",
      description: "Calcula tu peso saludable al instante con nuestra herramienta precisa. ¡Conoce tu IMC y lleva un estilo de vida más sano ahora mismo",
      slug: "/es/salud/calculadora-de-peso-saludable",
      keywords: "calculadora, peso, saludable, descubre, ideal, calcula, instante, nuestra, herramienta, precisa, conoce, lleva, estilo, vida, sano"
    }
  },
  'fat-intake-calculator': {
    en: {
      title: "Fat Intake Calculator",
      description: "Calculate your daily fat needs based on activity level and goals",
      slug: "/health/fat-intake-calculator",
      keywords: "fat, intake, calculator, calculate, your, daily, needs, based, activity, level"
    },
    pl: {
      title: "Kalkulator Spożycia Tłuszczu – Oblicz Zapotrzebowanie Online",
      description: "Użyj kalkulatora spożycia tłuszczu online, aby obliczyć dzienne zapotrzebowanie na tłuszcze. Proste, dokładne i darmowe narzędzie dietetyczne.",
      slug: "/pl/zdrowie/kalkulator-spozycia-tluszczu",
      keywords: "dzienne tłuszcze, spózycie tłuszczów, oblicz tłuszcze, dieta, makroskładniki"
    },
    br: {
      title: "Calculadora de Gorduras",
      description: "Calcule sua necessidade diária de gorduras de acordo com nível de atividade e objetivos (saúde, perda de peso, ganho muscular).",
      slug: "/br/saude/calculadora-de-consumo-de-gordura",
      keywords: "gordura diária, ingestão de gorduras, cálculo gordura, dieta, macronutrientes"
    },
    de: {
      title: "Fettbedarf-Rechner",
      description: "Berechnen Sie Ihren täglichen Fettbedarf basierend auf Aktivitätsniveau und Zielen (Gesundheit, Gewichtsverlust, Muskelaufbau).",
      slug: "/de/gesundheit/fett-aufnahme-rechner",
      keywords: "Fettbedarf, Fettaufnahme, Makronährstoffe, Ernährung"
    }
    ,
    es: {
      title: "Calculadora de Ingesta de Grasas – Controla tu Dieta Fácil",
      description: "Calcula tu ingesta diaria de grasas al instante con nuestra herramienta precisa. ¡Optimiza tu alimentación y mejora tu salud ahora mismo",
      slug: "/es/salud/calculadora-de-ingesta-de-grasas",
      keywords: "calculadora, ingesta, grasas, controla, dieta, fácil, calcula, diaria, instante, nuestra, herramienta, precisa, optimiza, alimentación, mejora"
    }
  },
  'carbohydrate-calculator': {
    en: {
      title: "Carbohydrate Calculator",
      description: "Calculate your daily carbohydrate needs based on activity level and goals",
      slug: "/health/carbohydrate-calculator",
      keywords: "carbohydrate, calculator, calculate, your, daily, needs, based, activity, level, goals"
    },
    pl: {
      title: "Kalkulator Węglowodanów – Oblicz Spożycie Online",
      description: "Użyj kalkulatora węglowodanów online, aby obliczyć dzienne spożycie węglowodanów i kalorie. Proste, dokładne i darmowe narzędzie dietetyczne.",
      slug: "/pl/zdrowie/kalkulator-weglowodanow",
      keywords: "węglowodany, spożycie węglowodanów, dieta, makroskładniki, kalorie z węglowodanów"
    },
    br: {
      title: "Calculadora de Carboidratos",
      description: "Calcule as necessidades diárias de carboidratos de acordo com seu nível de atividade e objetivos (energia, performance, perda de peso).",
      slug: "/br/saude/calculadora-de-carboidratos",
      keywords: "carboidratos diários, ingestão carboidratos, energia, performance, dieta"
    },
    de: {
      title: "Kohlenhydrate Rechner – Täglichen Bedarf einfach berechnen",
      description: "Berechne mit dem Kohlenhydrate Rechner deinen täglichen Bedarf. Ideal für Diät",
      slug: "/de/gesundheit/kohlenhydrate-rechner",
      keywords: "Kohlenhydrate Bedarf, Kohlenhydrataufnahme, Ernährung, Energie"
    }
    ,
    es: {
      title: "Calculadora de Carbohidratos – Controla tu Dieta Fácil",
      description: "Calcula tu ingesta diaria de carbohidratos al instante con nuestra herramienta precisa. ¡Optimiza tu alimentación y mejora tu salud ahora mismo",
      slug: "/es/salud/calculadora-de-carbohidratos",
      keywords: "calculadora, carbohidratos, controla, dieta, fácil, calcula, ingesta, diaria, instante, nuestra, herramienta, precisa, optimiza, alimentación, mejora"
    }
  },
  'ovulation-calculator': {
    en: {
      title: "Ovulation Calculator",
      description: "Estimate your ovulation date and fertile window",
      slug: "/health/ovulation-calculator",
      keywords: "ovulation, calculator, estimate, your, date, fertile, window"
    },
    pl: {
      title: "Kalkulator Owulacji – Oblicz Dni Płodne Online",
      description: "Użyj kalkulatora owulacji online, aby obliczyć dni płodne i niepłodne. Proste, dokładne i darmowe narzędzie dla kobiet planujących ciążę.",
      slug: "/pl/zdrowie/kalkulator-owulacji",
      keywords: "owulacja, dni płodne, planowanie ciąży, cykl miesięczny, płodność"
    },
    br: {
      title: "Calculadora de Ovulação",
      description: "Estime a data de ovulação e a janela fértil com base no seu ciclo menstrual. Útil para quem busca engravidar ou evitar gravidez.",
      slug: "/br/saude/calculadora-de-ovulacao",
      keywords: "ovulação, janela fértil, cálculo ovulação, fertilidade, ciclo menstrual"
    },
    de: {
      title: "Eisprungrechner – Fruchtbare Tage einfach berechnen",
      description: "Berechne mit dem Eisprungrechner deine fruchtbaren Tage. Ideal zur Familienplanung – schnell",
      slug: "/de/gesundheit/eisprungrechner",
      keywords: "Ovulation, fruchtbares Fenster, Eisprung, Fruchtbarkeit"
    }
    ,
    es: {
      title: "Calculadora de la Ovulación – Controla tu Fertilidad y Ciclo Menstrual",
      description: "Utiliza nuestra calculadora de la ovulación para predecir tus días fértiles, seguir tu ciclo menstrual y planificar tu salud reproductiva de manera sencilla y precisa.",
      slug: "/es/salud/calculadora-de-la-ovulacion",
      keywords: "calculadora, ovulación, controla, fertilidad, ciclo, menstrual, utiliza, nuestra, predecir, días, fértiles, seguir, planificar, salud, reproductiva"
    }
  },
  'lean-body-mass-calculator': {
    en: {
      title: "Lean Body Mass Calculator",
      description: "Calculate your lean body mass based on weight and body fat percentage",
      slug: "/health/lean-body-mass-calculator",
      keywords: "lean, body, mass, calculator, calculate, your, based, weight, fat, percentage"
    },
    pl: {
      title: "Kalkulator Beztłuszczowej Masy Ciała – Oblicz Online",
      description: "Użyj kalkulatora beztłuszczowej masy ciała online, aby obliczyć masę mięśniową bez tłuszczu. Proste i dokładne narzędzie fitness.",
      slug: "/pl/zdrowie/kalkulator-beztluszczowej-masy-ciala",
      keywords: "masa beztłuszczowa, masa mięśniowa, skład ciała, oblicz masę mięśni"
    },
    br: {
      title: "Calculadora de Massa Corporal Magra",
      description: "Calcule sua massa corporal magra com base no peso e percentual de gordura corporal. Útil para planejamento de treino e dieta.",
      slug: "/br/saude/calculadora-de-massa-corporal-magra",
      keywords: "massa magra, massa corporal magra, composição corporal, cálculo massa magra"
    },
    de: {
      title: "Magere-Körpermasse-Rechner",
      description: "Berechnen Sie Ihre fettfreie Körpermasse basierend auf Gewicht und Körperfettanteil. Hilfreich für Trainings- und Ernährungsplanung.",
      slug: "/de/gesundheit/malterr-korpro-masse-rechner",
      keywords: "fettfreie Masse, Körperzusammensetzung, Trainingsplanung, Ernährungsplanung"
    }
    ,
    es: {
      title: "Calculadora de Masa Corporal Magra – Calcula Fácil y Rápido",
      description: "Calcula tu masa corporal magra al instante con nuestra herramienta precisa. ¡Optimiza tu entrenamiento y mejora tu composición corporal ahora mismo",
      slug: "/es/salud/calculadora-de-masa-corporal-magra",
      keywords: "calculadora, masa, corporal, magra, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, optimiza, entrenamiento, mejora, composición"
    }
  },
  'tdee-calculator': {
    en: {
      title: "TDEE Calculator",
      description: "Calculate your Total Daily Energy Expenditure (TDEE) based on activity level",
      slug: "/health/tdee-calculator",
      keywords: "tdee, calculator, calculate, your, total, daily, energy, expenditure, based, activity"
    },
    pl: {
      title: "Kalkulator TDEE – Oblicz Dzienne Zapotrzebowanie Kalorii",
      description: "Użyj kalkulatora TDEE online, aby obliczyć całkowite dzienne zapotrzebowanie kaloryczne. Proste, dokładne i darmowe narzędzie zdrowotne.",
      slug: "/pl/zdrowie/kalkulator-tdee",
      keywords: "TDEE, zapotrzebowanie kaloryczne, wydatek energetyczny, kalorie dziennie, metabolizm"
    },
    br: {
      title: "Calculadora TDEE",
      description: "Calcule seu gasto energético total diário (TDEE) com base no nível de atividade. Use para planejar calorias para perda, manutenção ou ganho.",
      slug: "/br/saude/calculadora-gdet",
      keywords: "TDEE, gasto energético, calorias diárias, manutenção peso, perda gordura"
    },
    de: {
      title: "TDEE Rechner – Täglichen Kalorienverbrauch berechnen",
      description: "Berechne mit dem TDEE Rechner deinen täglichen Kalorienverbrauch. Ideal für Abnehmen",
      slug: "/de/gesundheit/tdee-rechner",
      keywords: "TDEE, Kalorienbedarf, Energieverbrauch, Gewichtsmanagement"
    }
    ,
    es: {
      title: "Calculadora TDEE – Calcula tus Calorías y Gasto Energético",
      description: "Utiliza nuestra calculadora TDEE para estimar tu gasto energético diario, controlar tus calorías y optimizar tu nutrición y rendimiento físico de manera sencilla.",
      slug: "/es/salud/calculadora-tdee",
      keywords: "calculadora, tdee, calcula, calorías, gasto, energético, utiliza, nuestra, estimar, diario, controlar, optimizar, nutrición, rendimiento, físico"
    }
  },
  'conception-calculator': {
    en: {
      title: "Conception Calculator",
      description: "Estimate your conception date based on ovulation and intercourse dates.",
      slug: "/health/conception-calculator",
      keywords: "conception, calculator, estimate, your, date, based, ovulation, intercourse, dates"
    },
    pl: {
      title: "Kalkulator Poczęcia – Oblicz Datę Poczęcia Online",
      description: "Użyj kalkulatora poczęcia online, aby obliczyć przewidywaną datę poczęcia i dni płodne. Proste, dokładne i darmowe narzędzie dla przyszłych rodziców.",
      slug: "/pl/zdrowie/kalkulator-poczecia",
      keywords: "poczęcie, data poczęcia, owulacja, planowanie ciąży, zapłodnienie"
    },
    br: {
      title: "Calculadora de Concepção",
      description: "Estime a data provável da concepção com base nas datas de ovulação e relações. Útil para entender a gravidez inicial.",
      slug: "/br/saude/calculadora-de-concepcao",
      keywords: "data concepção, concepção provável, ovulação, gravidez inicial"
    },
    de: {
      title: "Empfängnisrechner – Geburtstermin & Empfängnistag berechnen",
      description: "Berechne mit dem Empfängnisrechner den genauen Empfängnistag und Geburtstermin. Einfach",
      slug: "/de/gesundheit/empfangnisrechner",
      keywords: "Empfängnisdatum, Zeugung, Eisprung, frühe Schwangerschaft"
    }
    ,
    es: {
      title: "Calculadora de Concepción – Planea tu Embarazo Fácil",
      description: "Calcula tus fechas ideales para concebir al instante con nuestra herramienta precisa. ¡Planifica tu embarazo y aumenta tus posibilidades ahora mismo",
      slug: "/es/salud/calculadora-de-concepcion",
      keywords: "calculadora, concepción, planea, embarazo, fácil, calcula, fechas, ideales, concebir, instante, nuestra, herramienta, precisa, planifica, aumenta"
    }
  },
  'gfr-calculator': {
    en: {
      title: "GFR Calculator",
      description: "Estimate your Glomerular Filtration Rate (GFR) based on creatinine levels.",
      slug: "/health/gfr-calculator",
      keywords: "gfr, calculator, estimate, your, glomerular, filtration, rate, based, creatinine, levels"
    },
    pl: {
      title: "Kalkulator GFR – Oblicz Filtrację Kłębuszkową Online",
      description: "Użyj kalkulatora GFR online, aby obliczyć wskaźnik filtracji kłębuszkowej i ocenić funkcję nerek. Proste, dokładne i darmowe narzędzie zdrowotne.",
      slug: "/pl/zdrowie/kalkulator-gfr",
      keywords: "GFR, filtracja kłębuszkowa, funkcja nerek, kreatynina, zdrowie nerek"
    },
    br: {
      title: "Calculadora de Taxa de Filtração Glomerular (TFG)",
      description: "Estime sua taxa de filtração glomerular (TFG) com base nos níveis de creatinina. Indicador importante da função renal.",
      slug: "/br/saude/calculadora-tfg",
      keywords: "TFG, função renal, creatinina, calculadora TFG, saúde renal"
    },
    de: {
      title: "GFR Rechner – Nierenfunktion einfach online berechnen",
      description: "Berechne mit dem GFR Rechner deine Nierenfunktion schnell und genau. Ideal zur Kontrolle der Gesundheit – einfach & kostenlos online!",
      slug: "/de/gesundheit/gfr-rechner",
      keywords: "GFR Rechner, Nierenfunktion, Kreatinin, glomeruläre Filtrationsrate"
    }
    ,
    es: {
      title: "Calculadora de TFG – Calcula tu Frecuencia de Trabajo Fácil",
      description: "Calcula tu Tasa de Flujo Glomerular (TFG) al instante con nuestra herramienta precisa. ¡Evalúa tu salud renal y toma decisiones inteligentes ahora mismo",
      slug: "/es/salud/calculadora-de-TFG",
      keywords: "calculadora, calcula, frecuencia, trabajo, fácil, tasa, flujo, glomerular, instante, nuestra, herramienta, precisa, evalúa, salud, renal"
    }
  },
  'anorexic-bmi-calculator': {
    en: {
      title: "Anorexic BMI Calculator",
      description: "Calculate BMI for individuals with anorexia.",
      slug: "/health/anorexic-bmi-calculator",
      keywords: "anorexic, bmi, calculator, calculate, individuals, anorexia"
    },
    pl: {
      title: "Kalkulator BMI dla Anoreksji – Oblicz Online",
      description: "Użyj kalkulatora BMI dla anoreksji online, aby obliczyć wskaźnik masy ciała. Skonsultuj się z lekarzem w celu interpretacji wyniku.",
      slug: "/pl/zdrowie/kalkulator-bmi-anoreksja",
      keywords: "BMI anoreksja, screening anoreksja, zdrowie psychiczne, ocena żywieniowa"
    },
    br: {
      title: "Calculadora de IMC para Anorexia",
      description: "Calcule o IMC para indivíduos com anorexia. Use como ferramenta de triagem — consulte um profissional de saúde para interpretação.",
      slug: "/br/saude/calculadora-imc-anorexico",
      keywords: "IMC anorexia, triagem anorexia, saúde mental, avaliação nutricional"
    },
    de: {
      title: "BMI-Rechner für Anorexie",
      description: "Berechnen Sie den BMI für Personen mit Anorexie. Nur als Screening-Tool — medizinische Beratung ist erforderlich.",
      slug: "/de/gesundheit/anorektisch-bmi-rechner",
      keywords: "BMI Anorexie, Screening, Ernährungsberatung, psychische Gesundheit"
    }
    ,
    es: {
      title: "Calculadora de IMC – Evalúa tu Peso y Salud Fácilmente",
      description: "Calcula tu IMC al instante con nuestra herramienta precisa. ¡Monitorea tu salud y recibe orientación para mantener un peso seguro y saludable",
      slug: "/es/salud/calculadora-de-IMC-anorexica",
      keywords: "calculadora, evalúa, peso, salud, fácilmente, calcula, instante, nuestra, herramienta, precisa, monitorea, recibe, orientación, mantener, seguro"
    }
  },
  'ideal-weight-calculator': {
    en: {
      title: "Ideal Weight Calculator",
      description: "Calculate your ideal body weight range based on height and gender",
      slug: "/health/ideal-weight-calculator",
      keywords: "ideal, weight, calculator, calculate, your, body, range, based, height, gender"
    },
    pl: {
      title: "Kalkulator Idealnej Wagi – Oblicz Wagę Ciała Online",
      description: "Użyj kalkulatora idealnej wagi online, aby sprawdzić swoją wagę optymalną według wzrostu i płci. Proste, dokładne i darmowe narzędzie zdrowotne.",
      slug: "/pl/zdrowie/kalkulator-idealnej-wagi",
      keywords: "idealna waga, waga ciała, wzrost, BMI, zdrowa waga"
    },
    br: {
      title: "Calculadora de Peso Ideal",
      description: "Calcule a faixa de peso ideal com base na altura e sexo, usando fórmulas reconhecidas. Use como referência para metas saudáveis.",
      slug: "/br/saude/calculadora-de-peso-ideal",
      keywords: "peso ideal, faixa peso ideal, IMC, meta saudável, referência peso"
    },
    de: {
      title: "Idealgewicht Rechner – Finde dein optimales Körpergewicht",
      description: "Berechne mit dem Idealgewicht Rechner dein optimales Körpergewicht. Schnell",
      slug: "/de/gesundheit/idealgewicht-rechner",
      keywords: "Idealgewicht, BMI, Gewichtsspanne, Gesundheitsziele"
    }
    ,
    es: {
      title: "Calculadora de Peso Ideal – Determina tu Peso según Altura e IMC",
      description: "Utiliza nuestra calculadora de peso ideal para conocer tu peso recomendado, analizar tu altura y calcular tu IMC de manera sencilla y precisa.",
      slug: "/es/salud/calculadora-de-peso-ideal",
      keywords: "calculadora, peso, ideal, determina, según, altura, utiliza, nuestra, conocer, recomendado, analizar, calcular, manera, sencilla, precisa"
    }
  },
  'overweight-calculator': {
    en: {
      title: "Overweight Calculator",
      description: "Calculate BMI for individuals with overweight.",
      slug: "/health/overweight-calculator",
      keywords: "overweight, calculator, calculate, bmi, individuals"
    },
    pl: {
      title: "Kalkulator Nadwagi – Oblicz BMI Online",
      description: "Użyj kalkulatora nadwagi online, aby obliczyć BMI i zrozumieć ryzyko zdrowotne związane z nadwagą. Proste i dokładne narzędzie zdrowotne.",
      slug: "/pl/zdrowie/kalkulator-nadwagi",
      keywords: "nadwaga, BMI, ryzyko zdrowotne, oblicz BMI"
    },
    br: {
      title: "Calculadora de Sobrepeso",
      description: "Calcule o IMC para indivíduos com sobrepeso e entenda as categorias de risco associadas.",
      slug: "/br/saude/calculadora-de-sobrepeso",
      keywords: "sobrepeso, IMC, risco saúde, cálculo IMC"
    },
    de: {
      title: "Übergewichtsrechner",
      description: "Berechnen Sie den BMI für Personen mit Übergewicht und verstehen Sie mögliche Gesundheitsrisiken.",
      slug: "/de/gesundheit/uebergewicht-rechner",
      keywords: "Übergewicht, BMI, Gesundheitsrisiken"
    }
    ,
    es: {
      title: "Calculadora de Sobrepeso – Evalúa tu Peso Fácil y Rápido",
      description: "Calcula tu índice de sobrepeso al instante con nuestra herramienta precisa. ¡Monitorea tu salud y toma decisiones para un estilo de vida más saludable ahora!",
      slug: "/es/salud/calculadora-de-sobrepeso",
      keywords: "calculadora, sobrepeso, evalúa, peso, fácil, rápido, calcula, índice, instante, nuestra, herramienta, precisa, monitorea, salud, toma"
    }
  },
  'body-type-calculator': {
    en: {
      title: "Body Type Calculator",
      description: "Determine your body type based on measurements and characteristics.",
      slug: "/health/body-type-calculator",
      keywords: "body, type, calculator, determine, your, based, measurements, characteristics"
    },
    pl: {
      title: "Kalkulator Typu Sylwetki – Poznaj Swoją Budowę Ciała",
      description: "Użyj kalkulatora typu sylwetki online, aby określić swój typ ciała: ektomorfik, mezomorfik lub endomorfik. Proste, szybkie i darmowe narzędzie.",
      slug: "/pl/zdrowie/kalkulator-typu-sylwetki",
      keywords: "typ sylwetki, ektomorfik, mezomorfik, endomorfik, budowa ciała"
    },
    br: {
      title: "Calculadora de Tipo Corporal",
      description: "Determine seu tipo corporal com base em medidas e características físicas. Útil para ajustar treinamento e dieta.",
      slug: "/br/saude/Calculadora-de-Biotipo-Corporal",
      keywords: "tipo corporal, ectomorfo, mesomorfo, endomorfo, planejamento treinamento"
    },
    de: {
      title: "Körperform Rechner – Bestimme deinen Körpertyp online",
      description: "Finde mit dem Körperform Rechner heraus",
      slug: "/de/gesundheit/korperform-rechner",
      keywords: "Körpertyp, Ektomorph, Mesomorph, Endomorph, Trainingsplanung"
    }
    ,
    es: {
      title: "Calculadora de Tipo de Cuerpo – Descubre tu Morfología",
      description: "Descubre tu tipo de cuerpo al instante con nuestra calculadora precisa. ¡Conoce tu morfología y optimiza tu entrenamiento y estilo de vida ahora mismo!",
      slug: "/es/salud/calculadora-de-tipo-de-cuerpo",
      keywords: "calculadora, tipo, cuerpo, descubre, morfología, instante, nuestra, precisa, conoce, optimiza, entrenamiento, estilo, vida, ahora, mismo"
    }
  },
  'period-calculator': {
    en: {
      title: "Period Calculator",
      description: "Calculate your menstrual cycle and ovulation dates.",
      slug: "/health/period-calculator",
      keywords: "period, calculator, calculate, your, menstrual, cycle, ovulation, dates"
    },
    pl: {
      title: "Kalkulator Okresu – Oblicz Cykl Miesięczny Online",
      description: "Użyj kalkulatora okresu online, aby śledzić cykl menstruacyjny i przewidzieć kolejną miesiączkę. Proste, dokładne i darmowe narzędzie dla kobiet.",
      slug: "/pl/zdrowie/kalkulator-okresu",
      keywords: "okres, cykl miesięczny, miesiączka, owulacja, kalendarz menstruacyjny"
    },
    br: {
      title: "Calculadora de Ciclo Menstrual",
      description: "Calcule seu ciclo menstrual e datas de ovulação para acompanhar sua saúde reprodutiva.",
      slug: "/br/saude/calculadora-de-periodo-fertil",
      keywords: "ciclo menstrual, ovulação, calendário menstrual, saúde reprodutiva"
    },
    de: {
      title: "Periodenrechner – Menstruationszyklus einfach berechnen",
      description: "Berechne mit dem Periodenrechner deinen Menstruationszyklus. Erfahre nächste Periode & fruchtbare Tage – schnell",
      slug: "/de/gesundheit/periodenrechner",
      keywords: "Menstruationszyklus, Eisprungtermine, Zykluskalender"
    }
    ,
    es: {
      title: "Calculadora Menstrual – Controla tu Ciclo Fácil y Rápido",
      description: "Calcula tus fechas del ciclo menstrual al instante con nuestra herramienta precisa. ¡Lleva un control de tu salud y predice tu próximo periodo ahora mismo!",
      slug: "/es/salud/calculadora-menstrual",
      keywords: "calculadora, menstrual, controla, ciclo, fácil, rápido, calcula, fechas, instante, nuestra, herramienta, precisa, lleva, control, salud"
    }
  },
  'bmr-calculator': {
    en: {
      title: "BMR Calculator",
      description: "Calculate your Basal Metabolic Rate (BMR) for calorie needs",
      slug: "/health/bmr-calculator",
      keywords: "bmr, calculator, calculate, your, basal, metabolic, rate, calorie, needs"
    },
    pl: {
      title: "Kalkulator BMR – Oblicz Podstawową Przemianę Materii",
      description: "Użyj kalkulatora BMR online, aby obliczyć dzienne zapotrzebowanie kaloryczne i podstawową przemianę materii. Proste, dokładne i darmowe narzędzie zdrowotne.",
      slug: "/pl/zdrowie/kalkulator-bmr",
      keywords: "BMR, podstawowa przemiana materii, metabolizm, zapotrzebowanie kaloryczne, spalanie kalorii"
    },
    br: {
      title: "Calculadora de Taxa Metabólica Basal (TMB)",
      description: "Calcule sua taxa metabólica basal (TMB) para estimar necessidades calóricas em repouso.",
      slug: "/br/saude/calculadora-tmb",
      keywords: "TMB, taxa metabólica basal, calorias em repouso, metabolismo"
    },
    de: {
      title: "BMR-Rechner",
      description: "Berechnen Sie Ihre basale Stoffwechselrate (BMR), um den Kalorienbedarf im Ruhezustand zu schätzen.",
      slug: "/de/gesundheit/bmr-rechner",
      keywords: "BMR Rechner, Grundumsatz, Kalorienbedarf"
    }
    ,
    es: {
      title: "Calculadora del Metabolismo Basal – Calcula Fácil y Rápido",
      description: "Calcula tu metabolismo basal al instante con nuestra herramienta precisa. ¡Optimiza tu dieta y entrenamiento para alcanzar tus metas ahora mismo!",
      slug: "/es/salud/calculadora-del-metabolismo-basal",
      keywords: "calculadora, metabolismo, basal, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, optimiza, dieta, entrenamiento, alcanzar, metas"
    }
  },
  'weight-watchers-points-calculator': {
    en: {
      title: "Weight Watchers Points Calculator",
      description: "Calculate Weight Watchers points based on food items.",
      slug: "/health/weight-watchers-points-calculator",
      keywords: "weight, watchers, points, calculator, calculate, based, food, items"
    },
    pl: {
      title: "Kalkulator Punktów Weight Watchers – Oblicz Online",
      description: "Użyj kalkulatora punktów Weight Watchers online, aby obliczyć punkty dla produktów spożywczych. Proste narzędzie dietetyczne.",
      slug: "/pl/zdrowie/kalkulator-punktow-weight-watchers",
      keywords: "Weight Watchers, punkty WW, kontrola żywienia, oblicz punkty"
    },
    br: {
      title: "Calculadora de Pontos (Weight Watchers)",
      description: "Calcule pontos de acordo com o método Weight Watchers para alimentos consumidos. Use como referência de controle alimentar.",
      slug: "/br/saude/calculadora-de-pontos-vigilantes-do-peso",
      keywords: "Weight Watchers, pontos WW, controle alimentar, cálculo pontos"
    },
    de: {
      title: "Weight Watchers Punkte Rechner – Punkte einfach berechnen",
      description: "Berechne mit dem Weight Watchers Punkte Rechner deine täglichen Punkte. Ideal zum Abnehmen – schnell",
      slug: "/de/gesundheit/weight-watchers-punkte-berechnen",
      keywords: "WW Punkte, Weight Watchers Rechner, Ernährungsplanung"
    }
    ,
    es: {
      title: "Calculadora de Puntos Weight Watchers – Calcula Fácil",
      description: "Calcula tus puntos Weight Watchers al instante con nuestra herramienta precisa. ¡Controla tu dieta y alcanza tus metas de manera saludable ahora mismo!",
      slug: "/es/salud/calculadora-de-puntos-weight-watchers",
      keywords: "calculadora, puntos, weight, watchers, calcula, fácil, instante, nuestra, herramienta, precisa, controla, dieta, alcanza, metas, manera"
    }
  },
  'body-surface-area-calculator': {
    en: {
      title: "Body Surface Area Calculator",
      description: "Calculate your body surface area (BSA) using various methods.",
      slug: "/health/body-surface-area-calculator",
      keywords: "body, surface, area, calculator, calculate, your, bsa, using, various, methods"
    },
    pl: {
      title: "Kalkulator Powierzchni Ciała – Oblicz Powierzchnię Online",
      description: "Użyj kalkulatora powierzchni ciała online, aby obliczyć powierzchnię skóry i wskaźniki zdrowotne. Proste, szybkie i darmowe narzędzie dla każdego.",
      slug: "/pl/zdrowie/kalkulator-powierzchni-ciala",
      keywords: "powierzchnia ciała, BSA, dawkowanie leków, pole powierzchni ciała"
    },
    br: {
      title: "Calculadora de Área de Superfície Corporal (ASC)",
      description: "Calcule a área de superfície corporal (ASC) usando diferentes fórmulas clínicas. Útil para dosagem medicamentosa.",
      slug: "/br/saude/calculadora-de-area-de-superficie-corporal",
      keywords: "ASC, área superfície corporal, dosagem medicamentosa, cálculo BSA"
    },
    de: {
      title: "Körperoberfläche Rechner – BSA einfach online berechnen",
      description: "Berechne mit dem Körperoberfläche Rechner (BSA) deine Körperfläche schnell & genau. Ideal für Medizin",
      slug: "/de/gesundheit/berechnung-der-korperoberflache",
      keywords: "Körperoberfläche, BSA, Dosierung, Medizin"
    }
    ,
    es: {
      title: "Calculadora de Superficie Corporal – Calcula Fácil y Rápido",
      description: "Calcula la superficie corporal al instante con nuestra herramienta precisa. ¡Optimiza evaluaciones médicas y controla tu salud ahora mismo!",
      slug: "/es/salud/calculadora-de-superficie-corporal",
      keywords: "calculadora, superficie, corporal, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, optimiza, evaluaciones, médicas, controla, salud"
    }
  },
  'calorie-calculator': {
    en: {
      title: "Calorie Calculator",
      description: "Calculate daily calorie needs based on your lifestyle and goals",
      slug: "/health/calorie-calculator",
      keywords: "calorie, calculator, calculate, daily, needs, based, your, lifestyle, goals"
    },
    pl: {
      title: "Kalkulator Kalorii – Oblicz Dzienne Spożycie Kalorii",
      description: "Użyj kalkulatora kalorii online, aby obliczyć dzienne spożycie kalorii i zbilansować dietę. Proste, dokładne i darmowe narzędzie zdrowotne.",
      slug: "/pl/zdrowie/kalkulator-kalorii",
      keywords: "kalorie, dzienne zapotrzebowanie kaloryczne, dieta, odchudzanie, bilans kaloryczny"
    },
    br: {
      title: "Calculadora de Calorias",
      description: "Calcule suas necessidades calóricas diárias com base em idade, sexo, peso, altura e nível de atividade física.",
      slug: "/br/saude/calculadora-de-calorias",
      keywords: "calorias, necessidades calóricas, cálculo calorias, dieta, atividade física"
    },
    de: {
      title: "Kalorienrechner",
      description: "Berechnen Sie Ihren täglichen Kalorienbedarf basierend auf Ihren Zielen.",
      slug: "/de/gesundheit/kalorienrechner",
      keywords: "Kalorienrechner, Kalorienbedarf, abnehmen, zunehmen, Gewicht halten, Kalorien zählen"
    },
    es: {
      title: "Calculadora de Calorías – Calcula tu Ingesta Diaria Fácil",
      description: "Calcula tus calorías diarias al instante con nuestra herramienta precisa. ¡Optimiza tu dieta y alcanza tus metas de nutrición y salud ahora mismo!",
      slug: "/es/salud/calculadora-de-calorias",
      keywords: "calculadora, calorías, calcula, ingesta, diaria, fácil, diarias, instante, nuestra, herramienta, precisa, optimiza, dieta, alcanza, metas"
    }
  },
  'bac-calculator': {
    en: {
      title: "Blood Alcohol Content (BAC) Calculator",
      description: "Estimate your blood alcohol content (BAC) based on drinks consumed.",
      slug: "/health/bac-calculator",
      keywords: "blood, alcohol, content, bac, calculator, estimate, your, based, drinks, consumed"
    },
    pl: {
      title: "Kalkulator Stężenia Alkoholu – Oblicz BAC Online",
      description: "Użyj kalkulatora stężenia alkoholu we krwi online, aby obliczyć poziom alkoholu i bezpieczne granice. Proste, szybkie i darmowe narzędzie zdrowotne.",
      slug: "/pl/zdrowie/kalkulator-stezenia-alkoholu-we-krwi",
      keywords: "BAC, stężenie alkoholu, alkohol we krwi, promile, bezpieczne granice"
    },
    br: {
      title: "Calculadora de Teor Alcoólico no Sangue (BAC)",
      description: "Estime seu teor alcoólico no sangue (BAC) com base nas bebidas consumidas. Ferramenta útil para entender os efeitos do álcool.",
      slug: "/br/saude/calculadora-de-bac",
      keywords: "teor alcoólico sangue, BAC, calculadora álcool, efeitos álcool, consumo bebidas"
    },
    de: {
      title: "Blutalkohol Rechner – Promille einfach online berechnen",
      description: "Berechne mit dem Blutalkohol Rechner (Promillerechner) deinen Alkoholwert im Blut. Schnell",
      slug: "/de/gesundheit/blutalkohol-berechnen",
      keywords: "Blutalkoholkonzentration, BAC, Alkoholrechner, Alkoholwirkung, Getränkeverbrauch"
    }
    ,
    es: {
      title: "Calculadora de Alcohol en Sangre – Conoce tu BAC Rápido",
      description: "Calcula tu nivel de alcohol en sangre al instante con nuestra herramienta precisa. ¡Mantente seguro y toma decisiones responsables ahora mismo!",
      slug: "/es/salud/calculadora-de-alcohol-en-sangre",
      keywords: "calculadora, alcohol, sangre, conoce, rápido, calcula, nivel, instante, nuestra, herramienta, precisa, mantente, seguro, toma, decisiones"
    }
  },
  'body-fat-calculator': {
    en: {
      title: "Body Fat Calculator",
      description: "Calculate body fat percentage using various methods",
      slug: "/health/body-fat-calculator",
      keywords: "body, fat, calculator, calculate, percentage, using, various, methods"
    },
    pl: {
      title: "Kalkulator Tkanki Tłuszczowej – Oblicz Procent Tłuszczu",
      description: "Użyj kalkulatora tkanki tłuszczowej online, aby obliczyć procent tłuszczu w ciele. Proste, szybkie i dokładne narzędzie zdrowotne dla każdego.",
      slug: "/pl/zdrowie/kalkulator-tkanki-tluszczowej",
      keywords: "tkanka tłuszczowa, procent tłuszczu, skład ciała, pomiar tłuszczu, zdrowie metaboliczne"
    },
    br: {
      title: "Calculadora de Gordura Corporal",
      description: "Calcule a porcentagem de gordura corporal usando vários métodos. Útil para monitorar a composição corporal e saúde geral.",
      slug: "/br/saude/calculadora-de-gordura-corporal",
      keywords: "gordura corporal, porcentagem gordura, calculadora composição corporal, saúde metabólica, monitoramento peso"
    },
    de: {
      title: "Körperfett Rechner – Körperfettanteil einfach berechnen",
      description: "Berechne mit dem Körperfett Rechner deinen Körperfettanteil schnell & genau. Ideal für Fitness",
      slug: "/de/gesundheit/korperfettrechner",
      keywords: "Körperfett, Körperfettanteil, Körperzusammensetzungsrechner, Stoffwechselgesundheit, Gewichtsüberwachung"
    }
    ,
    es: {
      title: "Calculadora de Grasa Corporal – Mide tu % Fácil y Rápido",
      description: "Calcula tu porcentaje de grasa corporal al instante con nuestra herramienta precisa. ¡Optimiza tu entrenamiento y mejora tu salud ahora mismo!",
      slug: "/es/salud/calculadora-de-grasa-corporal",
      keywords: "calculadora, grasa, corporal, mide, fácil, rápido, calcula, porcentaje, instante, nuestra, herramienta, precisa, optimiza, entrenamiento, mejora"
    }
  },
  'macro-calculator': {
    en: {
      title: "Macro Calculator",
      description: "Calculate macronutrient requirements for your goals",
      slug: "/health/macro-calculator",
      keywords: "macro, calculator, calculate, macronutrient, requirements, your, goals"
    },
    pl: {
      title: "Kalkulator Makro – Oblicz Makroskładniki Online",
      description: "Użyj kalkulatora makro online, aby obliczyć białka, tłuszcze i węglowodany w diecie. Proste, dokładne i darmowe narzędzie zdrowotne dla każdego.",
      slug: "/pl/zdrowie/kalkulator-makro",
      keywords: "makroskładniki, białko, tłuszcze, węglowodany, planowanie żywienia, dieta"
    },
    br: {
      title: "Calculadora de Macronutrientes",
      description: "Calcule os requisitos de macronutrientes com base em seus objetivos nutricionais. Planeje sua ingestão de proteínas, carboidratos e gorduras.",
      slug: "/br/saude/calculadora-macro",
      keywords: "macronutrientes, calculadora proteínas, carboidratos, gorduras, planejamento nutricional, objetivos dieta"
    },
    de: {
      title: "Makro Rechner – Berechne deine täglichen Makronährstoffe",
      description: "Berechne mit dem Makro Rechner dein ideales Verhältnis von Eiweiß",
      slug: "/de/gesundheit/makro-rechner",
      keywords: "Makronährstoffe, Proteinkalkulator, Kohlenhydrate, Fette, Ernährungsplanung, Diätziele"
    }
    ,
    es: {
      title: "Calculadora de Macros – Calcula Proteínas, Grasas y Carbs",
      description: "Calcula tus macronutrientes diarios al instante con nuestra herramienta precisa. ¡Optimiza tu dieta y alcanza tus metas de nutrición ahora mismo!",
      slug: "/es/salud/calculadora-de-macros",
      keywords: "calculadora, macros, calcula, proteínas, grasas, carbs, macronutrientes, diarios, instante, nuestra, herramienta, precisa, optimiza, dieta, alcanza"
    }
  },
  'pregnancy-calculator': {
    en: {
      title: "Pregnancy Calculator",
      description: "Estimate pregnancy schedule based on due date, last period, ultrasound, conception, or IVF transfer date.",
      slug: "/health/pregnancy-calculator",
      keywords: "pregnancy, calculator, estimate, schedule, based, due, date, last, period, ultrasound"
    },
    pl: {
      title: "Kalkulator Ciąży – Oblicz Tydzień Ciąży Online",
      description: "Użyj kalkulatora ciąży online, aby obliczyć tydzień ciąży i przewidywaną datę porodu. Proste, szybkie i darmowe narzędzie dla przyszłych mam.",
      slug: "/pl/zdrowie/kalkulator-ciazy",
      keywords: "ciąża, tydzień ciąży, termin porodu, USG, rozwój płodu"
    },
    br: {
      title: "Calculadora de Gravidez",
      description: "Estime o cronograma da gravidez com base na data prevista do parto, última menstruação, ultrassom, concepção ou data de transferência de FIV. Acompanhe seu desenvolvimento.",
      slug: "/br/saude/calculadora-de-gravidez",
      keywords: "gravidez, calculadora gestacional, data parto, ultrassom, FIV, desenvolvimento fetal"
    },
    de: {
      title: "Schwangerschaftsrechner – Geburtstermin einfach berechnen",
      description: "Berechne mit dem Schwangerschaftsrechner deinen Geburtstermin & Schwangerschaftswoche. Schnell",
      slug: "/de/gesundheit/schwangerschaftsrechner",
      keywords: "Schwangerschaft, Schwangerschaftsrechner, Geburtstermin, Ultraschall, IVF, Fetalentwicklung"
    }
    ,
    es: {
      title: "Calculadora de Embarazo – Conoce tu Fecha de Parto Fácil",
      description: "Calcula tu fecha de parto al instante con nuestra herramienta precisa. ¡Planifica tu embarazo y sigue tu desarrollo semana a semana ahora mismo!",
      slug: "/es/salud/calculadora-de-embarazo",
      keywords: "calculadora, embarazo, conoce, fecha, parto, fácil, calcula, instante, nuestra, herramienta, precisa, planifica, sigue, desarrollo, semana"
    }
  },
  'pregnancy-conception-calculator': {
    en: {
      title: "Pregnancy Conception Calculator",
      description: "Estimate conception date and pregnancy milestones based on due date, last period, or ultrasound date.",
      slug: "/health/pregnancy-conception-calculator",
      keywords: "pregnancy, conception, calculator, estimate, date, milestones, based, due, last, period"
    },
    pl: {
      title: "Kalkulator Poczęcia i Ciąży – Oblicz Datę Poczęcia",
      description: "Użyj kalkulatora poczęcia i ciąży online, aby oszacować datę poczęcia i kamienie milowe ciąży. Proste narzędzie dla przyszłych rodziców.",
      slug: "/pl/zdrowie/kalkulator-poczecia-i-ciazy",
      keywords: "poczęcie, kamienie milowe ciąży, data porodu, USG ciążowe"
    },
    br: {
      title: "Calculadora de Concepção e Gravidez",
      description: "Estime a data da concepção e os marcos da gravidez com base na data prevista do parto, última menstruação o u fecha do ultrassom. Planeje sua jornada gestacional.",
      slug: "/br/saude/calculadora-de-concepcao-de-gravidez",
      keywords: "concepção, marcos gravidez, data parto, ultrassom gestacional, planejamento gestacional"
    },
    de: {
      title: "Empfängnis- und Schwangerschaftsrechner",
      description: "Schätzen Sie das Empfängnisdatum und die Schwangerschaftsmeilensteine basierend auf dem Geburtstermin, der letzten Periode oder dem Ultraschalldatum. Planen Sie Ihre Schwangerschaftsreise.",
      slug: "/de/gesundheit/schwangerschaft-empfangnis-rechner",
      keywords: "Empfängnis, Schwangerschaftsmeilensteine, Geburtstermin, Schwangerschafts-USG, Schwangerschaftsplanung"
    }
    ,
    es: {
      title: "Calculadora de Fecha de Concepción – Calcula Fácil y Rápido",
      description: "Calcula la fecha de concepción al instante con nuestra herramienta precisa. ¡Planifica tu embarazo, estima fechas y obtén resultados ahora mismo!",
      slug: "/es/salud/calculadora-de-fecha-de-concepcion",
      keywords: "calculadora, fecha, concepción, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, planifica, embarazo, estima, fechas, obtén"
    }
  },
  'percentage-calculator': {
    en: {
      title: "Percentage Calculator",
      description: "Calculate percentages, ratios, and percentage changes easily",
      slug: "/maths/percentage-calculator",
      keywords: "percentage, calculator, calculate, percentages, ratios, changes, easily"
    },
    pl: {
      title: "Kalkulator Procentowy – Oblicz Procent Online Szybko",
      description: "Użyj kalkulatora procentowego online, aby szybko obliczyć procenty, wartości i różnice. Proste, dokładne i darmowe narzędzie matematyczne.",
      slug: "/pl/matematyka/kalkulator-procentowy",
      keywords: "procenty, obliczanie procentów, wartość procentowa, zmiana procentowa, proporcja"
    },
    br: {
      title: "Calculadora de Percentual",
      description: "Calcule porcentagens, proporções e variações percentuais de forma rápida e precisa.",
      slug: "/br/matematica/calculadora-de-porcentagem",
      keywords: "percentual, cálculo porcentagem, variação percentural, proporção"
    },
    de: {
      title: "Prozentrechner",
      description: "Berechnen Sie Prozentsätze, Zunahmen und Abnahmen einfach und schnell.",
      slug: "/de/mathe/prozentrechner",
      keywords: "Prozentrechner, Prozent berechnen, prozentuale Zunahme, prozentuale Abnahme, Mathematik"
    },
    es: {
      title: "Calculadora de Porcentajes – Obtén Resultados al Instante",
      description: "Calcula porcentajes fácil y rápido con nuestra calculadora online. Ideal para tareas, finanzas y negocios. ¡Ingresa los valores y obtén el resultado ahora!",
      slug: "/es/matematicas/calculadora-de-porcentajes",
      keywords: "calculadora, porcentajes, obtén, resultados, instante, calcula, fácil, rápido, nuestra, online, ideal, tareas, finanzas, negocios, ingresa"
    }
  },
  'empirical-rule-calculator': {
    en: {
      title: "Empirical Rule Calculator (68-95-99.7 Rule)",
      description: "Calculate data ranges using the 68-95-99.7 rule for normal distributions. Find percentages within 1, 2, or 3 standard deviations from the mean.",
      slug: "/maths/empirical-rule-calculator",
      keywords: "empirical rule calculator, 68-95-99.7 rule, normal distribution calculator, standard deviation calculator, three sigma rule, bell curve calculator, statistical calculator, data range calculator"
    },
    pl: {
      title: "Kalkulator Reguły Empirycznej (Reguła 68-95-99,7)",
      description: "Oblicz zakresy danych za pomocą reguły 68-95-99,7 dla rozkładów normalnych. Znajdź procenty w obrębie 1, 2 lub 3 odchyleń standardowych od średniej.",
      slug: "/pl/matematyka/kalkulator-reguly-empirycznej",
      keywords: "kalkulator reguły empirycznej, reguła 68-95-99.7, kalkulator rozkładu normalnego, kalkulator odchylenia standardowego, reguła trzech sigma, kalkulator krzywej dzwonowej"
    },
    br: {
      title: "Calculadora de Regra Empírica (Regra 68-95-99,7)",
      description: "Calcule intervalos de dados usando a regra 68-95-99,7 para distribuições normais. Encontre porcentagens dentro de 1, 2 ou 3 desvios padrão da média.",
      slug: "/br/matematica/calculadora-de-regra-empirica",
      keywords: "calculadora regra empírica, regra 68-95-99.7, calculadora distribuição normal, calculadora desvio padrão, regra três sigma, curva de sino"
    },
    de: {
      title: "Empirischer Regelrechner (68-95-99,7-Regel)",
      description: "Berechnen Sie Datenbereiche mithilfe der 68-95-99,7-Regel für Normalverteilungen. Finden Sie Prozentsätze innerhalb von 1, 2 oder 3 Standardabweichungen vom Mittelwert.",
      slug: "/de/mathe/empirischer-regelrechner",
      keywords: "empirischer Regelrechner, 68-95-99.7 Regel, Normalverteilungsrechner, Standardabweichungsrechner, Drei-Sigma-Regel, Glockenkurvenrechner"
    },
    es: {
      title: "Calculadora de Regla Empírica (Regla 68-95-99,7)",
      description: "Calcule rangos de datos usando la regla 68-95-99,7 para distribuciones normales. Encuentra porcentajes dentro de 1, 2 o 3 desviaciones estándar de la media.",
      slug: "/es/matematicas/calculadora-de-regla-empirica",
      keywords: "calculadora regla empírica, regla 68-95-99.7, calculadora distribución normal, calculadora desviación estándar, regla tres sigma, curva de campana"
    }
  },
  'percent-error-calculator': {
    en: {
      title: "Percentage Error Calculator",
      description: "Calculate the percentage error between an estimated value and the actual value.",
      slug: "/maths/percent-error-calculator",
      keywords: "percentage, error, calculator, calculate, between, estimated, value, actual"
    },
    pl: {
      title: "Kalkulator Błędu Procentowego – Oblicz Online",
      description: "Użyj kalkulatora błędu procentowego online, aby obliczyć błąd między wartością oszacowaną a rzeczywistą. Proste narzędzie matematyczne.",
      slug: "/pl/matematyka/kalkulator-bledu-procentowego",
      keywords: "błąd procentowy, dokładność, oblicz błąd, wartość oszacowana"
    },
    br: {
      title: "Calculadora de Erro Percentual",
      description: "Calcule o erro percentual entre um valor estimado e o valor real para avaliar a precisão.",
      slug: "/br/matematica/calculadora-de-erro-percentual",
      keywords: "erro percentual, cálculo erro, precisão, valor estimado"
    },
    de: {
      title: "Prozentualer Fehlerrechner",
      description: "Berechnen Sie den prozentualen Fehler zwischen einem geschätzten und einem tatsächlichen Wert zur Bewertung der Genauigkeit.",
      slug: "/de/mathe/prozent-fehler-rechner",
      keywords: "prozentualer Fehler, Genauigkeit, Fehlerberechnung"
    }
    ,
    es: {
      title: "Calculadora de Error Porcentual – Resultado Preciso y Rápido",
      description: "Calcula el error porcentual en segundos con nuestra herramienta exacta. Ideal para laboratorio, ciencia y matemáticas. ¡Ingresa tus datos y obtén el resultado ya!",
      slug: "/es/matematicas/calculadora-de-error-porcentual",
      keywords: "calculadora, error, porcentual, resultado, preciso, rápido, calcula, segundos, nuestra, herramienta, exacta, ideal, laboratorio, ciencia, matemáticas"
    }
  },
  'critical-point-calculator': {
    en: {
      title: "Critical Point Calculator",
      description: "Calculate the critical point of a function.",
      slug: "/maths/critical-point-calculator",
      keywords: "critical, point, calculator, calculate, function"
    },
    pl: {
      title: "Kalkulator Punktu Krytycznego – Oblicz Online",
      description: "Użyj kalkulatora punktu krytycznego online, aby znaleźć punkty krytyczne funkcji. Proste narzędzie matematyczne dla studentów.",
      slug: "/pl/matematyka/kalkulator-punktu-krytycznego",
      keywords: "punkt krytyczny, pochodna, maksimum, minimum"
    },
    br: {
      title: "Calculadora de Ponto Crítico",
      description: "Encontre pontos críticos de uma função (máximos, mínimos e pontos de inflexão) analisando derivadas.",
      slug: "/br/matematica/calculadora-de-ponto-critico",
      keywords: "ponto crítico, derivada, máximo, mínimo, ponto inflexão"
    },
    de: {
      title: "Kritische Punkte Rechner – Extrema & Wendepunkte berechnen",
      description: "Berechne mit dem Kritische Punkte Rechner Extrema & Wendepunkte von Funktionen. Schnell",
      slug: "/de/mathe/kritische-Punkte-rechner",
      keywords: "kritische Punkte, Ableitung, Extremstellen, Wendepunkt"
    }
    ,
    es: {
      title: "Calculadora de Puntos Críticos – Encuentra Máximos y Mínimos",
      description: "Calcula puntos críticos de funciones rápidamente. Ideal para matemáticas, análisis y cálculo. ¡Ingresa tu función y obtén resultados al instante!",
      slug: "/es/matematicas/calculadora-de-puntos-criticos",
      keywords: "calculadora, puntos, críticos, encuentra, máximos, mínimos, calcula, funciones, rápidamente, ideal, matemáticas, análisis, cálculo, ingresa, función"
    }
  },
  'relative-extrema-calculator': {
    en: {
      title: "Relative Extrema Calculator - Find Maxima, Minima & Saddle Points",
      description: "Find all relative maxima, minima, and saddle points with detailed step-by-step solutions using first and second derivative tests.",
      slug: "/maths/relative-extrema-calculator",
      keywords: "relative extrema, calculator, maxima, minima, saddle points, critical points, second derivative test, calculus, optimization"
    },
    pl: {
      title: "Kalkulator Ekstremów Względnych – Maksima i Minima",
      description: "Znajdź wszystkie ekstrema względne funkcji z testem drugiej pochodnej. Oblicz maksima, minima i punkty siodłowe krok po kroku.",
      slug: "/pl/matematyka/kalkulator-ekstremow-wzglednych",
      keywords: "ekstrema względne, maksimum, minimum, punkt siodłowy, pochodna, analiza matematyczna"
    },
    br: {
      title: "Calculadora de Extremos Relativos - Máximos e Mínimos",
      description: "Encontre todos os extremos relativos de funções com teste da segunda derivada. Calcule máximos, mínimos e pontos de sela passo a passo.",
      slug: "/br/matematica/calculadora-de-extremos-relativos",
      keywords: "extremos relativos, máximo, mínimo, ponto de sela, derivada, cálculo, otimização"
    },
    de: {
      title: "Relative Extrema Rechner - Maxima, Minima & Sattelpunkte",
      description: "Finden Sie alle relativen Extrema mit dem zweiten Ableitungstest. Berechnen Sie Maxima, Minima und Sattelpunkte Schritt für Schritt.",
      slug: "/de/mathe/relative-extrema-rechner",
      keywords: "relative Extrema, Maximum, Minimum, Sattelpunkt, Ableitung, Analysis, Optimierung"
    },
    es: {
      title: "Calculadora de Extremos Relativos - Máximos y Mínimos",
      description: "Encuentra todos los extremos relativos con la prueba de la segunda derivada. Calcula máximos, mínimos y puntos de silla paso a paso.",
      slug: "/es/matematicas/calculadora-de-extremos-relativos",
      keywords: "extremos relativos, máximo, mínimo, punto de silla, derivada, cálculo, optimización"
    }
  },
  'simpsons-rule-calculator': {
    en: {
      title: "Simpson",
      description: "Calculate definite integrals using Simpson",
      slug: "/maths/simpsons-rule-calculator",
      keywords: "simpson, calculate, definite, integrals, using"
    },
    pl: {
      title: "Reguła Simpsona – Kalkulator Całek Online",
      description: "Użyj reguły Simpsona online, aby obliczyć całki oznaczone numerycznie. Proste i dokładne narzędzie matematyczne.",
      slug: "/pl/matematyka/regula-simpsona",
      keywords: "reguła Simpsona, całka oznaczona, integracja numeryczna"
    },
    br: {
      title: "Regra de Simpson",
      description: "Calcule integrais definidas numericamente usando a regra de Simpson para aproximação precisa.",
      slug: "/br/matematica/calculadora-regra-de-simpson",
      keywords: "Simpson, integral definida, integração numérica, aproximação"
    },
    de: {
      title: "Simpson-Regel Rechner",
      description: "Berechnen Sie bestimmte Integrale numerisch mit der Simpson-Regel für präzise Approximationen.",
      slug: "/de/mathe/simpsons-regel-rechner",
      keywords: "Simpson Regel, numerische Integration, bestimmte Integrale"
    }
    ,
    es: {
      title: "Calculadora de la Regla de Simpson – Integra Fácil y Rápido",
      description: "Resuelve integrales con la regla de Simpson de forma rápida y precisa. Ideal para cálculo e ingeniería. ¡Ingresa los datos y obtén el resultado al instante!",
      slug: "/es/matematicas/calculadora-de-la-regla-de-Simpson",
      keywords: "calculadora, regla, simpson, integra, fácil, rápido, resuelve, integrales, forma, rápida, precisa, ideal, cálculo, ingeniería, ingresa"
    }
  },
  'mean-value-theorem-calculator': {
    en: {
      title: "Mean Value Theorem Calculator",
      description: "Apply the Mean Value Theorem to find points on a curve.",
      slug: "/maths/mean-value-theorem-calculator",
      keywords: "mean, value, theorem, calculator, apply, find, points, curve"
    },
    pl: {
      title: "Twierdzenie o Wartości Średniej – Kalkulator Online",
      description: "Użyj twierdzenia o wartości średniej online, aby znaleźć punkty na krzywej funkcji. Proste narzędzie matematyczne.",
      slug: "/pl/matematyka/twierdzenie-o-wartosci-sredniej",
      keywords: "twierdzenie o wartości średniej, pochodna, punkty krzywej"
    },
    br: {
      title: "Teorema do Valor Médio",
      description: "Aplique o Teorema do Valor Médio para encontrar pontos relevantes na curva de uma função usando derivadas.",
      slug: "/br/matematica/calculadora-teorema-do-valor-medio",
      keywords: "teorema valor médio, derivada, ponto médio, cálculo"
    },
    de: {
      title: "Durchschnittsrechner – Mittelwert einfach online berechnen",
      description: "Berechne mit dem Durchschnittsrechner den Mittelwert deiner Zahlen. Schnell",
      slug: "/de/mathe/durchschnittsrechner",
      keywords: "Mittelwertsatz, Ableitung, Kurvenpunkte"
    }
    ,
    es: {
      title: "Calculadora Teorema del Valor Medio – Resultados al Instante",
      description: "Aplica el Teorema del Valor Medio en segundos con nuestra calculadora online. Ingresa tu función y obtén el punto c y el valor exacto al instante.",
      slug: "/es/matematicas/calculadora-teorema-valor-medio",
      keywords: "calculadora, teorema, valor, medio, resultados, instante, aplica, segundos, nuestra, online, ingresa, función, obtén, punto, exacto"
    }
  },
  'random-number-generator': {
    en: {
      title: "Random Number Generator",
      description: "Generate random numbers within a specified range",
      slug: "/maths/random-number-generator",
      keywords: "random, number, generator, generate, numbers, within, specified, range"
    },
    pl: {
      title: "Generator Liczb Losowych – Wygeneruj Online",
      description: "Użyj generatora liczb losowych online, aby wygenerować liczby w określonym zakresie. Proste, szybkie i darmowe narzędzie.",
      slug: "/pl/matematyka/generator-liczb-losowych",
      keywords: "liczby losowe, generator, symulacja, losowanie"
    },
    br: {
      title: "Gerador de Números Aleatórios",
      description: "Gere números aleatórios dentro de um intervalo especificado para testes, sorteios ou simulações.",
      slug: "/br/matematica/gerador-de-numero-aleatorio",
      keywords: "números aleatórios, gerador aleatório, simulação, sorteio"
    },
    de: {
      title: "Zufallszahlengenerator",
      description: "Generieren Sie Zufallszahlen in einem angegebenen Bereich für Tests, Simulationen oder Auslosungen.",
      slug: "/de/mathe/zufall-zahl-generator-rechner",
      keywords: "Zufallszahlen, Generator, Simulation, Auslosung"
    }
    ,
    es: {
      title: "Generador de Números Aleatorios – Rápido y Online",
      description: "Genera números aleatorios al instante con nuestro generador online. Ideal para estadísticas, sorteos y simulaciones. ¡Haz clic y obtén números ahora!",
      slug: "/es/matematicas/generador-de-numeros-aleatorios",
      keywords: "generador, números, aleatorios, rápido, online, genera, instante, nuestro, ideal, estadísticas, sorteos, simulaciones, clic, obtén, ahora"
    }
  },
  'scientific-calculator': {
    en: {
      title: "Scientific Calculator",
      description: "Perform advanced mathematical calculations and graphing",
      slug: "/maths/scientific-calculator",
      keywords: "scientific, calculator, perform, advanced, mathematical, calculations, graphing"
    },
    pl: {
      title: "Kalkulator Naukowy – Obliczenia Matematyczne Online",
      description: "Użyj kalkulatora naukowego online, aby wykonywać zaawansowane obliczenia matematyczne, funkcje i wzory. Proste, szybkie i darmowe narzędzie.",
      slug: "/pl/matematyka/kalkulator-naukowy",
      keywords: ""
    },
    br: {
      title: "Calculadora Científica",
      description: "Execute cálculos matemáticos avançados e gere gráficos. Suporta funções científicas e trigonometria.",
      slug: "/br/matematica/calculadora-cientifica",
      keywords: "calculadora científica, funções trigonométricas, gráficos, cálculo avançado"
    },
    de: {
      title: "Wissenschaftlicher Taschenrechner – Online & kostenlos nutzen",
      description: "Nutze den wissenschaftlichen Taschenrechner online für komplexe Berechnungen. Schnell",
      slug: "/de/mathe/wissenschaftlicher-taschenrechner",
      keywords: "wissenschaftlicher Taschenrechner, trigonometrie, grafiken"
    }
    ,
    es: {
      title: "Calculadora Científica Online – Cálculos Rápidos y Precisos",
      description: "Realiza operaciones científicas avanzadas al instante. Funciones trigonométricas, logarítmicas, potencias y más. ¡Usa la calculadora online ahora!",
      slug: "/es/matematicas/calculadora-cientifica",
      keywords: "calculadora, científica, online, cálculos, rápidos, precisos, realiza, operaciones, científicas, avanzadas, instante, funciones, trigonométricas, logarítmicas, potencias"
    }
  },
  'volume-calculator': {
    en: {
      title: "Volume Calculator",
      description: "Calculate the volume of various shapes",
      slug: "/maths/volume-calculator",
      keywords: "volume, calculator, calculate, various, shapes"
    },
    pl: {
      title: "Kalkulator Objętości – Oblicz Objętość Online Szybko",
      description: "Użyj kalkulatora objętości online, aby obliczyć objętość różnych brył i pojemników. Proste, dokładne i darmowe narzędzie matematyczne.",
      slug: "/pl/matematyka/kalkulator-objetosci",
      keywords: ""
    },
    br: {
      title: "Calculadora de Volume",
      description: "Calcule o volume de várias formas geométricas (cilindro, cubo, esfera, prisma) de forma rápida.",
      slug: "/br/matematica/calculadora-de-volume",
      keywords: "calculadora volume, volume formas, cilindro, esfera, cubo"
    },
    de: {
      title: "Volumenrechner – Volumen von Körpern einfach berechnen",
      description: "Berechne mit dem Volumenrechner das Volumen von Würfeln",
      slug: "/de/mathe/volumenrechner",
      keywords: "Volumenrechner, Zylinder, Kugel, Volumenberechnung"
    }
    ,
    es: {
      title: "Calculadora de Volumen – Obtén Resultados al Instante",
      description: "Calcula el volumen de cubos, cilindros, prismas y más en segundos. Ingresa las medidas y obtén resultados exactos fácilmente. ¡Prueba la herramienta ahora!",
      slug: "/es/matematicas/calculadora-de-volumen",
      keywords: "calculadora, volumen, obtén, resultados, instante, calcula, cubos, cilindros, prismas, segundos, ingresa, medidas, exactos, fácilmente, prueba"
    }
  },
  'ballistic-coefficient-calculator': {
    en: {
      title: "Ballistic Coefficient Calculator",
      description: "Calculate the ballistic coefficient of a projectile.",
      slug: "/physics/ballistic-coefficient-calculator",
      keywords: "ballistic, coefficient, calculator, calculate, projectile"
    },
    pl: {
      title: "Kalkulator Współczynnika Balistycznego – Oblicz Online",
      description: "Użyj kalkulatora współczynnika balistycznego online, aby obliczyć współczynnik pocisku. Proste narzędzie fizyczne.",
      slug: "/pl/fizyka/kalkulator-wspolczynnika-balistycznego",
      keywords: "współczynnik balistyczny, opór powietrza, pocisk, balistyka"
    },
    br: {
      title: "Calculadora de Coeficiente Balístico",
      description: "Calcule o coeficiente balístico de um projétil para avaliar sua resistência ao ar e desempenho.",
      slug: "/br/fisica/calculadora-de-coeficiente-balistico",
      keywords: "coeficiente balístico, resistência ao ar, projétil, balística"
    },
    de: {
      title: "Ballistischer Koeffizienten-Rechner",
      description: "Berechnen Sie den ballistischen Koeffizienten eines Projektils zur Bewertung des Luftwiderstands und der Flugbahn.",
      slug: "/de/physik/ballistisch-koeffizient-rechner",
      keywords: "ballistischer Koeffizient, Luftwiderstand, Projektil"
    }
    ,
    es: {
      title: "Calculadora Balística – Trayectoria y Alcance con Precisión",
      description: "Calcula trayectoria, caída y energía balística con precisión para uso seguro en deportes y estudios. Ingresa datos y obtén resultados al instante.",
      slug: "/es/fisica/calculadora-balistica",
      keywords: "calculadora, balística, trayectoria, alcance, precisión, calcula, caída, energía, seguro, deportes, estudios, ingresa, datos, obtén, resultados"
    }
  },
  'velocity-calculator': {
    en: {
      title: "Velocity Calculator",
      description: "Calculate velocity, speed, and acceleration",
      slug: "/physics/velocity-calculator",
      keywords: "velocity, calculator, calculate, speed, acceleration"
    },
    pl: {
      title: "Kalkulator Prędkości – Oblicz Prędkość Online Szybko",
      description: "Użyj kalkulatora prędkości online, aby obliczyć prędkość ciała w ruchu. Proste, dokładne i darmowe narzędzie fizyczne dla uczniów i studentów.",
      slug: "/pl/fizyka/kalkulator-predkosci",
      keywords: ""
    },
    br: {
      title: "Calculadora de Velocidade",
      description: "Calcule velocidade, rapidez e aceleração a partir de distância, tempo e variações de velocidade.",
      slug: "/br/fisica/calculadora-de-velocidade",
      keywords: "velocidade, aceleração, cálculo velocidade, física"
    },
    de: {
      title: "Geschwindigkeitsrechner – Geschwindigkeit einfach berechnen",
      description: "Berechne mit dem Geschwindigkeitsrechner die Geschwindigkeit aus Strecke & Zeit. Schnell",
      slug: "/de/physik/geschwindigkeitsrechner",
      keywords: "Geschwindigkeit, Beschleunigung, Physik Rechner"
    }
    ,
    es: {
      title: "Calculadora de Velocidad – Calcula Rápido y Fácil",
      description: "Calcula velocidad al instante con nuestra herramienta precisa. Ideal para física, deportes o transporte. ¡Ingresa distancia y tiempo y obtén el resultado ya!",
      slug: "/es/fisica/calculadora-de-velocidad",
      keywords: "calculadora, velocidad, calcula, rápido, fácil, instante, nuestra, herramienta, precisa, ideal, física, deportes, transporte, ingresa, distancia"
    }
  },
  'arrow-speed-calculator': {
    en: {
      title: "Arrow Speed Calculator",
      description: "Calculate arrow speed, momentum, and kinetic energy using IBO ratings.",
      slug: "/physics/arrow-speed-calculator",
      keywords: "arrow, speed, calculator, calculate, momentum, kinetic, energy, using, ibo, ratings"
    },
    pl: {
      title: "Kalkulator Prędkości Strzały – Oblicz Online",
      description: "Użyj kalkulatora prędkości strzały online, aby obliczyć prędkość, pęd i energię kinetyczną. Proste narzędzie dla łuczników.",
      slug: "/pl/fizyka/kalkulator-predkosci-strzaly",
      keywords: "prędkość strzały, energia kinetyczna, pęd, IBO"
    },
    br: {
      title: "Calculadora de Velocidade de Flecha",
      description: "Calcule velocidade de flechas, momento e energia cinética usando avaliações IBO e parâmetros do arco.",
      slug: "/br/fisica/calculadora-de-velocidade-de-flecha",
      keywords: "velocidade flecha, energia cinética, momento, IBO"
    },
    de: {
      title: "Pfeilgeschwindigkeitsrechner",
      description: "Berechnen Sie Pfeilgeschwindigkeit, Impuls und kinetische Energie unter Verwendung von IBO-Werten und Bogenparametern.",
      slug: "/de/physik/pfeil-geschwindigkeit-rechner",
      keywords: "Pfeilgeschwindigkeit, kinetische Energie, Impuls, IBO"
    }
    ,
    es: {
      title: "Calculadora de Velocidad de Flecha – Precisión al Instante",
      description: "Calcula la velocidad de tu flecha al instante con nuestra herramienta precisa. ¡Optimiza tu tiro con arco y mejora tu puntería ahora mismo!",
      slug: "/es/fisica/calculadora-de-velocidad-de-flecha",
      keywords: "calculadora, velocidad, flecha, precisión, instante, calcula, nuestra, herramienta, precisa, optimiza, tiro, arco, mejora, puntería, ahora"
    }
  },
  'car-jump-distance-calculator': {
    en: {
      title: "Car Jump Distance Calculator",
      description: "Calculate the distance a car can jump based on speed and angle.",
      slug: "/physics/car-jump-distance-calculator",
      keywords: "car, jump, distance, calculator, calculate, can, based, speed, angle"
    },
    pl: {
      title: "Kalkulator Odległości Skoku Samochodu – Oblicz Online",
      description: "Użyj kalkulatora odległości skoku samochodu online, aby obliczyć dystans skoku na podstawie prędkości i kąta. Proste narzędzie fizyczne.",
      slug: "/pl/fizyka/kalkulator-odleglosci-skoku-samochodu",
      keywords: "skok samochodu, dystans skoku, prędkość, kąt"
    },
    br: {
      title: "Calculadora de Distância de Salto de Carro",
      description: "Calcule a distância que um carro pode saltar com base na velocidade e ângulo de decolagem (parâmetros físicos ideais).",
      slug: "/br/fisica/calculadora-de-distancia-de-salto-de-carro",
      keywords: "distância salto carro, física salto, velocidade, ângulo"
    },
    de: {
      title: "Entfernungsrechner – Strecke aus Zeit & Tempo berechnen",
      description: "Berechne mit dem Entfernungsrechner die Strecke anhand von Zeit & Geschwindigkeit. Schnell",
      slug: "/de/physik/entfernungsrechner",
      keywords: "Sprungweite Auto, Geschwindigkeit, Absprungwinkel, Physik"
    }
    ,
    es: {
      title: "Calculadora de Distancia de Salto de Auto – Calcula Fácil",
      description: "Calcula la distancia de salto de tu auto al instante con nuestra herramienta precisa. ¡Optimiza tus maniobras y experimenta con seguridad ahora mismo!",
      slug: "/es/fisica/calculadora-da-distancia-de-salto-do-carro",
      keywords: "calculadora, distancia, salto, auto, calcula, fácil, instante, nuestra, herramienta, precisa, optimiza, maniobras, experimenta, seguridad, ahora"
    }
  },
  'conservation-of-momentum-calculator': {
    en: {
      title: "Conservation of Momentum Calculator",
      description: "Calculate the conservation of momentum in collisions.",
      slug: "/physics/conservation-of-momentum-calculator",
      keywords: "conservation, momentum, calculator, calculate, collisions"
    },
    pl: {
      title: "Conservation of Momentum Kalkulator",
      description: "Oblicz the conservation of momentum in collisions.",
      slug: "/pl/fizyka/kalkulator-zachowanie-of-pedu-kalkulador",
      keywords: ""
    },
    br: {
      title: "Calculadora de Conservação do Momento",
      description: "Calcule a conservação do momento linear em colisões, analise velocidades antes e depois do impacto.",
      slug: "/br/fisica/calculadora-de-conservacao-de-momento",
      keywords: "conservação momento, colisões, momento linear, física"
    },
    de: {
      title: "Impulserhaltung-Rechner",
      description: "Berechnen Sie die Impulserhaltung bei Kollisionen und analysieren Sie Geschwindigkeiten vor und nach dem Aufprall.",
      slug: "/de/physik/erhaltung-of-impuls-rechner",
      keywords: "Impulserhaltung, Kollision, Impuls, Physik"
    }
    ,
    es: {
      title: "Calculadora de Conservación del Momento – Física Fácil",
      description: "Calcula la conservación del momento lineal y angular al instante con nuestra herramienta precisa. ¡Resuelve problemas de física rápida y fácilmente!",
      slug: "/es/fisica/calculadora-da-conservacao-do-momento",
      keywords: "calculadora, conservación, momento, física, fácil, calcula, lineal, angular, instante, nuestra, herramienta, precisa, resuelve, problemas, rápida"
    }
  },
  'board-foot-calculator': {
    en: {
      title: "Board Foot Calculator",
      description: "Calculate board feet for lumber and building materials",
      slug: "/construction/board-foot-calculator",
      keywords: "board, foot, calculator, calculate, feet, lumber, building, materials"
    },
    pl: {
      title: "Stopa Deski Kalkulator",
      description: "Oblicz stopy deski dla drewno i materiały budowlane",
      slug: "/pl/budowa/kalkulator-deski-sdopy-kalkulador",
      keywords: ""
    },
    br: {
      title: "Calculadora de Board Foot (Madeiramento)",
      description: "Calcule board feet de madeira e materiais de construção para estimar quantidade necessária e custo.",
      slug: "/br/construcao/calculadora-de-pe-de-tabua",
      keywords: "board foot, madeira, cálculo madeira, materiais construção"
    },
    de: {
      title: "Board Foot Rechner (Holz)",
      description: "Berechnen Sie Board Feet für Holz und Baumaterialien zur Bedarfsermittlung und Kostenschätzung.",
      slug: "/de/konstruktion/brett-fub-rechner",
      keywords: "Board Foot, Holzberechnung, Baumaterial, Volumen"
    }
    ,
    es: {
      title: "Calculadora de Pies Cuadrados – Calcula Área Fácil y Rápido",
      description: "Calcula pies cuadrados al instante con nuestra herramienta precisa. Ideal para casas, terrenos y proyectos. ¡Ingresa medidas y obtén resultados ahora!",
      slug: "/es/construccion/calculadora-de-pes-quadrados",
      keywords: "calculadora, pies, cuadrados, calcula, área, fácil, rápido, instante, nuestra, herramienta, precisa, ideal, casas, terrenos, proyectos"
    }
  },
  'cubic-yard-calculator': {
    en: {
      title: "Cubic Yard Calculator",
      description: "Calculate cubic yards for concrete, soil, and other materials",
      slug: "/construction/cubic-yard-calculator",
      keywords: "cubic, yard, calculator, calculate, yards, concrete, soil, other, materials"
    },
    pl: {
      title: "Cubic Yard Kalkulator",
      description: "Oblicz cubic yards dla concrete, soil, i other materials",
      slug: "/pl/budowa/kalkulator-szesciennych-jardow",
      keywords: ""
    },
    br: {
      title: "Calculadora de Jardas Cúbicas",
      description: "Calcule jardas cúbicas para concreto, solo e outros materiais para estimar volumes de obra.",
      slug: "/br/construcao/calculadora-de-metros-cubicos",
      keywords: "jarda cúbica, volume concreto, cálculo volume, materiais de construção"
    },
    de: {
      title: "Kubik-Yard Rechner",
      description: "Berechnen Sie Kubik-Yards für Beton, Erde und andere Materialien zur Mengenermittlung.",
      slug: "/de/konstruktion/kubik-yard-rechner",
      keywords: "Kubik Yard, Volumenberechnung, Beton, Baustoffe"
    }
    ,
    es: {
      title: "Calculadora de Metros Cúbicos – Calcula Volumen Fácil",
      description: "Calcula metros cúbicos al instante con nuestra herramienta precisa. Ideal para líquidos, sólidos o construcción. ¡Ingresa medidas y obtén resultados ahora!",
      slug: "/es/construccion/calculadora-de-metros-cubicos",
      keywords: "calculadora, metros, cúbicos, calcula, volumen, fácil, instante, nuestra, herramienta, precisa, ideal, líquidos, sólidos, construcción, ingresa"
    }
  },
  'gallons-per-square-foot-calculator': {
    en: {
      title: "Gallons per Square Foot Calculator",
      description: "Calculate the number of gallons needed per square foot for painting or flooring.",
      slug: "/construction/gallons-per-square-foot-calculator",
      keywords: "gallons, per, square, foot, calculator, calculate, number, needed, painting, flooring"
    },
    pl: {
      title: "Gallons per Square Foot Kalkulator",
      description: "Oblicz the number of gallons needed per square foot dla painting or flooring.",
      slug: "/pl/budowa/kalkulator-galony-na-kwadradowy-sdopy-kalkulador",
      keywords: ""
    },
    br: {
      title: "Calculadora de Galões por Pé Quadrado",
      description: "Calcule quantos galões de tinta ou material são necessários por pé quadrado para pintura ou revestimento.",
      slug: "/br/construcao/calculadora-de-galoes-por-pe-quadrado",
      keywords: "galões por pé quadrado, cálculo tinta, revestimento, pintura"
    },
    de: {
      title: "Gallonen pro Quadratfuß Rechner",
      description: "Berechnen Sie die benötigten Gallonen pro Quadratfuß für Anstrich oder Bodenbelag.",
      slug: "/de/konstruktion/gallonen-pro-quadrat-fub-rechner",
      keywords: "Gallonen pro Quadratfuß, Farbbedarf, Bodenbelag, Berechnung"
    }
    ,
    es: {
      title: "Calculadora de Galones por Pie Cuadrado – Fácil y Rápida",
      description: "Calcula galones por pie cuadrado al instante con nuestra herramienta precisa. ¡Optimiza pintura, recubrimientos y proyectos de construcción ahora mismo!",
      slug: "/es/construccion/calculadora-de-galones-por-pie-cuadrado",
      keywords: "calculadora, galones, cuadrado, fácil, rápida, calcula, instante, nuestra, herramienta, precisa, optimiza, pintura, recubrimientos, proyectos, construcción"
    }
  },
  'size-to-weight-rectangular-cuboid-calculator': {
    en: {
      title: "Size to Weight Calculator",
      description: "Calculate the weight of a rectangular cuboid given its dimensions and material density.",
      slug: "/construction/size-to-weight-rectangular-cuboid-calculator",
      keywords: "size, weight, calculator, calculate, rectangular, cuboid, given, its, dimensions, material"
    },
    pl: {
      title: "Size to ciężar Kalkulator",
      description: "Oblicz the ciężar of a rectangular cuboid given its dimensions i material density.",
      slug: "/pl/budowa/kalkulator-rozmiar-do-wagi-prostokatny-prostopadloscian-kalkulador",
      keywords: ""
    },
    br: {
      title: "Calculadora de Peso a partir de Tamanho (Paralelepípedo)",
      description: "Calcule o peso de um paralelepípedo retangular com base em dimensões e densidade do material.",
      slug: "/br/construcao/calculadora-de-tamanho-para-peso-cuboide-retangular",
      keywords: "peso, dimensões, densidade, paralelepípedo, cálculo peso"
    },
    de: {
      title: "Größen-zu-Gewicht Rechner (Quader)",
      description: "Berechnen Sie das Gewicht eines Quaders anhand seiner Abmessungen und Materialdichte.",
      slug: "/de/konstruktion/grobe-to-gewicht-rechteckig-quader-rechner",
      keywords: "Gewicht berechnen, Quader, Materialdichte, Abmessungen"
    }
    ,
    es: {
      title: "Calcula Peso de Tubo Rectangular – Rápido y Preciso",
      description: "Calcula el peso de tubos rectangulares al instante con nuestra herramienta precisa. ¡Optimiza tus proyectos y toma decisiones de construcción ahora mismo!",
      slug: "/es/construccion/calculo-del-peso-del-tubo-rectangular",
      keywords: "calcula, peso, tubo, rectangular, rápido, preciso, tubos, rectangulares, instante, nuestra, herramienta, precisa, optimiza, proyectos, toma"
    }
  },
  'square-feet-to-cubic-yards-calculator': {
    en: {
      title: "Square Feet to Cubic Yards Calculator",
      description: "Convert square feet to cubic yards for concrete and other materials.",
      slug: "/construction/square-feet-to-cubic-yards-calculator",
      keywords: "square, feet, cubic, yards, calculator, convert, concrete, other, materials"
    },
    pl: {
      title: "Square Feet to Cubic Yards Kalkulator",
      description: "Konwertuj square feet to cubic yards dla concrete i other materials.",
      slug: "/pl/budowa/kalkulator-kwadradowy-stopy-do-szescienne-jards-kalkulador",
      keywords: ""
    },
    br: {
      title: "Conversor de Pés Quadrados para Jardas Cúbicas",
      description: "Converta pés quadrados em jardas cúbicas para estimar volume de concreto e outros materiais.",
      slug: "/br/construcao/calculadora-de-pes-quadrados-para-jardas-cubicas",
      keywords: "pés quadrados para jardas cúbicas, conversão volume, concreto"
    },
    de: {
      title: "Konverter: Quadratfuß zu Kubik-Yards",
      description: "Konvertieren Sie Quadratfuß in Kubik-Yards, um das Volumen von Beton und anderen Baustoffen zu bestimmen.",
      slug: "/de/konstruktion/quadrat-fub-to-kubik-yards-rechner",
      keywords: "Quadratfuß zu Kubik-Yards, Volumen konvertieren, Beton"
    }
    ,
    es: {
      title: "Calculadora de Yardas Cúbicas – Calcula Volumen Fácil",
      description: "Calcula yardas cúbicas al instante con nuestra herramienta precisa. Ideal para construcción, jardinería y proyectos. ¡Ingresa medidas y obtén resultados ya!",
      slug: "/es/construccion/calculadora-de-yardas-cubicas",
      keywords: "calculadora, yardas, cúbicas, calcula, volumen, fácil, instante, nuestra, herramienta, precisa, ideal, construcción, jardinería, proyectos, ingresa"
    }
  },
  'butter-calculator': {
    en: {
      title: "Butter Calculator",
      description: "Convert butter measurements between sticks, cups, tablespoons, teaspoons, and grams.",
      slug: "/food/butter-calculator",
      keywords: "butter, calculator, convert, measurements, between, sticks, cups, tablespoons, teaspoons, grams"
    },
    pl: {
      title: "Butter Kalkulator",
      description: "Konwertuj butter measurements between sticks, kubki, tablespoons, teaspoons, i grams.",
      slug: "/pl/zywnosc/kalkulator-maslo-kalkulador",
      keywords: ""
    },
    br: {
      title: "Calculadora de Manteiga",
      description: "Converta medidas de manteiga entre tabletes, xícaras, colheres e gramas para receitas precisas.",
      slug: "/br/alimento/calculadora-de-manteiga",
      keywords: "manteiga, converter medidas, xícaras, colheres, gramas, receita"
    },
    de: {
      title: "Butter-Konverter",
      description: "Konvertieren Sie Buttermaße zwischen Sticks, Tassen, Esslöffeln, Teelöffeln und Gramm für genaue Rezepte.",
      slug: "/de/essen/butter-rechner",
      keywords: "Butter, Maßeinheiten konvertieren, Tassen, Löffel, Gramm, Rezept"
    }
    ,
    es: {
      title: "Convertidor de Mantequilla – Convierte Medidas Fácil y Rápido",
      description: "Convierte mantequilla entre gramos, tazas y onzas al instante con nuestra herramienta precisa. ¡Simplifica tus recetas y cocina sin errores ahora mismo!",
      slug: "/es/alimentos/convertidor-de-mantequilla",
      keywords: "convertidor, mantequilla, convierte, medidas, fácil, rápido, entre, gramos, tazas, onzas, instante, nuestra, herramienta, precisa, simplifica"
    }
  },
  'cake-pan-calculator': {
    en: {
      title: "Cake Pan Calculator",
      description: "Calculate the equivalent sizes of round, square, and rectangular cake pans.",
      slug: "/food/cake-pan-calculator",
      keywords: "cake, pan, calculator, calculate, equivalent, sizes, round, square, rectangular, pans"
    },
    pl: {
      title: "Cake Pan Kalkulator",
      description: "Oblicz the equivalent sizes of round, square, i rectangular cake pans.",
      slug: "/pl/zywnosc/kalkulator-ciasto-patelnia-kalkulador",
      keywords: ""
    },
    br: {
      title: "Calculadora de Tamanho de Forma de Bolo",
      description: "Calcule tamanhos equivalentes entre formas redondas, quadradas e retangulares para adaptar receitas.",
      slug: "/br/alimento/calculadora-de-forma-de-bolo",
      keywords: "forma de bolo, tamanho equivalente, receita, conversão formas"
    },
    de: {
      title: "Kuchenform Rechner – Zutatenmenge einfach umrechnen",
      description: "Berechne mit dem Kuchenform Rechner die richtige Zutatenmenge für jede Backform. Schnell",
      slug: "/de/essen/kuchenform-rechner",
      keywords: "Backform Größe, Äquivalenz Backformen, Rezept anpassen"
    }
    ,
    es: {
      title: "Convertidor de Moldes para Pasteles – Medidas Precisas",
      description: "Convierte fácilmente el tamaño de moldes para pasteles entre pulgadas, cm y más. ¡Prepara tus recetas con precisión y sin errores ahora mismo!",
      slug: "/es/alimentos/convertidor-de-Moldes-para-Pasteles",
      keywords: "convertidor, moldes, pasteles, medidas, precisas, convierte, fácilmente, tamaño, entre, pulgadas, prepara, recetas, precisión, errores, ahora"
    }
  },
  'cooking-measurement-converter': {
    en: {
      title: "Cooking Measurement Converter",
      description: "Convert between different cooking measurements.",
      slug: "/food/cooking-measurement-converter",
      keywords: "cooking, measurement, converter, convert, between, different, measurements"
    },
    pl: {
      title: "Kalkulator Pomiarów Kulinarnych",
      description: "Konwertuj między różnymi miarami kulinarnymi takimi jak kubki, łyżki, uncje i gramy. Idealny do precyzyjnego dostosowywania przepisów.",
      slug: "/pl/zywnosc/kalkulator-gotowanie-pomiar-kalkulador",
      keywords: "miary kulinarne, konwerter kulinarny, kubki, łyżki, uncje, gramy, dostosowanie przepisów"
    },
    br: {
      title: "Conversor de Medidas para Cozinha",
      description: "Converta entre diferentes medidas de cozinha como xícaras, colheres, onças e gramas. Ideal para adaptar receitas com precisão.",
      slug: "/br/alimento/calculadora-de-medidas-culinarias",
      keywords: "medidas cozinha, conversor culinário, xícaras, colheres, onças, gramas, adaptação receitas"
    },
    de: {
      title: "Kochmaßeinheiten-Konverter",
      description: "Konvertieren Sie zwischen verschiedenen Kochmaßeinheiten wie Tassen, Esslöffeln, Unzen und Gramm. Ideal zur präzisen Anpassung von Rezepten.",
      slug: "/de/essen/koch-messung-rechner",
      keywords: "Kochmaße, Kochmaß-Konverter, Tassen, Löffel, Unzen, Gramm, Rezeptanpassung"
    }
    ,
    es: {
      title: "Convertidor de Medidas de Cocina – Fácil y Rápido",
      description: "Convierte ingredientes de cocina entre gramos, tazas, onzas y más al instante. ¡Simplifica tus recetas y cocina con precisión ahora mismo!",
      slug: "/es/alimentos/convertidor-de-medidas-de-cocina",
      keywords: "convertidor, medidas, cocina, fácil, rápido, convierte, ingredientes, entre, gramos, tazas, onzas, instante, simplifica, recetas, precisión"
    }
  },
  'cups-to-pounds-converter': {
    en: {
      title: "Cups to Pounds Converter",
      description: "Convert cups to pounds for various ingredients.",
      slug: "/food/cups-to-pounds-converter",
      keywords: "cups, pounds, converter, convert, various, ingredients"
    },
    pl: {
      title: "Konwerter Kubków na Funty",
      description: "Konwertuj kubki na funty dla różnych składników takich jak mąki, cukry i ziarna. Niezbędne narzędzie dla kucharzy i piekarzy.",
      slug: "/pl/zywnosc/kalkulator-kubki-do-funty-kalkulador",
      keywords: "kubki na funty, konwerter kulinarny, mąki, cukier, ziarna, kucharze, piekarze"
    },
    br: {
      title: "Conversor de Xícaras para Libras",
      description: "Converta xícaras em libras para diversos ingredientes como farinhas, açúcares e grãos. Essencial para cozinheiros e confeiteiros.",
      slug: "/br/alimento/calculadora-de-xicaras-para-libras",
      keywords: "xícaras para libras, conversor culinário, farinhas, açúcar, grãos, cozinheiros, confeiteiros"
    },
    de: {
      title: "Tassen-zu-Pfund-Konverter",
      description: "Konvertieren Sie Tassen in Pfund für verschiedene Zutaten wie Mehle, Zucker und Getreide. Unverzichtbares Werkzeug für Köche und Bäcker.",
      slug: "/de/essen/tassen-to-pfund-rechner",
      keywords: "Tassen zu Pfund, Koch-Konverter, Mehle, Zucker, Getreide, Köche, Bäcker"
    }
    ,
    es: {
      title: "Conversor de Tazas a Libras – Calcula Fácil y Rápido",
      description: "Convierte tazas a libras al instante con nuestra herramienta precisa. ¡Simplifica tus recetas y cocina con medidas exactas ahora mismo!",
      slug: "/es/alimentos/tazas-a-libras",
      keywords: "conversor, tazas, libras, calcula, fácil, rápido, convierte, instante, nuestra, herramienta, precisa, simplifica, recetas, cocina, medidas"
    }
  },
  'dry-to-cooked-pasta-converter': {
    en: {
      title: "Dry to Cooked Pasta Converter",
      description: "Convert dry pasta measurements to cooked pasta equivalents.",
      slug: "/food/dry-to-cooked-pasta-converter",
      keywords: "dry, cooked, pasta, converter, convert, measurements, equivalents"
    },
    br: {
      title: "Conversor de Macarrão Cru para Cozido",
      description: "Converta medidas de massa seca em equivalentes de massa cozida. Perfeito para planejar porções e evitar desperdício de alimentos.",
      slug: "/br/alimento/Conversor-de-Macarrao-Cru-para-Cozido",
      keywords: "massa seca cozida, conversor macarrão, porções, evitar desperdício, cozinha italiana"
    },
    pl: {
      title: "Kalkulator Suchego do Gotowanego Makaronu",
      description: "Konwertuj miary suchego makaronu na gotowany ekwiwalent. Idealny do planowania porcji i unikania marnowania żywności.",
      slug: "/pl/zywnosc/kalkulator-suchy-do-gotowany-makaron-kalkulador",
      keywords: "suchy makaron gotowany, konwerter makaronu, porcje, unikaj marnowania, kuchnia włoska"
    },
    de: {
      title: "Trockene-Nudeln-zu-gekochten-Nudeln-Konverter",
      description: "Konvertieren Sie Trockennudel-Maße in gekochte Nudel-Äquivalente. Perfekt zur Portionsplanung und Vermeidung von Lebensmittelverschwendung.",
      slug: "/de/essen/trocken-to-gekocht-nudeln-rechner",
      keywords: "Trockennudeln gekocht, Nudelkonverter, Portionen, Lebensmittelverschwendung vermeiden, italienische Küche"
    }
    ,
    es: {
      title: "Pasta Seca para Cocinar – Cantidades y Medidas Exactas",
      description: "Calcula la cantidad de pasta seca perfecta para tus recetas. ¡Optimiza tus porciones y cocina con precisión ahora mismo!",
      slug: "/es/alimentos/pasta-seca-para-cocinar",
      keywords: "pasta, seca, cocinar, cantidades, medidas, exactas, calcula, cantidad, perfecta, recetas, optimiza, porciones, cocina, precisión, ahora"
    }
  },
  'batting-average-calculator': {
    en: {
      title: "Batting Average Calculator",
      description: "Calculate batting average and related statistics",
      slug: "/sports/batting-average-calculator",
      keywords: "batting, average, calculator, calculate, related, statistics"
    },
    pl: {
      title: "Batting Average Kalkulator",
      description: "Oblicz batting average i related statistics",
      slug: "/pl/lekkoatletyka/kalkulator-uderzen-srednia-kalkulador",
      keywords: ""
    },
    br: {
      title: "Calculadora de Média de Rebatidas",
      description: "Calcule a média de rebatidas e estatísticas relacionadas no beisebol. Avalie o desempenho dos jogadores na casa de rebatidas.",
      slug: "/br/esportes/calculadora-de-media-de-rebatidas",
      keywords: "média rebatidas, calculadora beisebol, estatísticas rebatedores, desempenho jogadores, casa rebatidas"
    },
    de: {
      title: "Schlagdurchschnitts-Rechner",
      description: "Berechnen Sie den Schlagdurchschnitt und verwandte Statistiken im Baseball. Bewerten Sie die Leistung der Schlagmänner.",
      slug: "/de/sport/schlag-durchschnitt-rechner",
      keywords: "Schlagdurchschnitt, Baseball-Rechner, Schlagmann-Statistiken, Spielerleistung, Schlagmänner"
    }
    ,
    es: {
      title: "Calculadora de Promedio de Bateo – Calcula Fácil y Rápido",
      description: "Calcula tu promedio de bateo al instante con nuestra herramienta precisa. ¡Mejora tu rendimiento y analiza tus estadísticas de béisbol ahora mismo",
      slug: "/es/deportes/calculadora-de-promedio-de-bateo",
      keywords: "calculadora, promedio, bateo, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, mejora, rendimiento, analiza, estadísticas, béisbol"
    }
  },
  'earned-run-average-calculator': {
    en: {
      title: "Earned Run Average Calculator",
      description: "Calculate earned run average (ERA) for pitchers",
      slug: "/sports/earned-run-average-calculator",
      keywords: "earned, run, average, calculator, calculate, era, pitchers"
    },
    pl: {
      title: "Earned Run Average Kalkulator",
      description: "Oblicz earned run average (ERA) dla pitchers",
      slug: "/pl/lekkoatletyka/kalkulator-zdobyty-bieg-srednia-kalkulador",
      keywords: ""
    },
    br: {
      title: "Calculadora de Média de Pontos Ganho (ERA)",
      description: "Calcule a média de pontos ganho (ERA) para arremessadores de beisebol. Métrica essencial para avaliar a eficácia dos pitchers.",
      slug: "/br/esportes/calculadora-de-media-de-corridas-ganhas",
      keywords: "ERA, média pontos ganho, calculadora pitchers, eficácia arremessadores, beisebol"
    },
    de: {
      title: "Earned-Run-Average-Rechner (ERA)",
      description: "Berechnen Sie das Earned Run Average (ERA) für Baseball-Pitcher. Wesentliche Kennzahl zur Bewertung der Pitcher-Effektivität.",
      slug: "/de/sport/verdient-lauf-durchschnitt-rechner",
      keywords: "ERA, Earned Run Average, Pitcher-Rechner, Pitcher-Effektivität, Baseball"
    }
    ,
    es: {
      title: "Promedio de Carreras Limpias – Calcula Fácil y Rápido",
      description: "Calcula tu promedio de carreras limpias al instante con nuestra herramienta precisa. ¡Mejora tu rendimiento y analiza tus estadísticas ahora mismo",
      slug: "/es/deportes/promedio-de-carreras-limpias",
      keywords: "promedio, carreras, limpias, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, mejora, rendimiento, analiza, estadísticas, ahora"
    }
  },
  'fielding-percentage-calculator': {
    en: {
      title: "Fielding Percentage Calculator",
      description: "Calculate fielding percentage for baseball players",
      slug: "/sports/fielding-percentage-calculator",
      keywords: "fielding, percentage, calculator, calculate, baseball, players"
    },
    pl: {
      title: "Fielding Percentage Kalkulator",
      description: "Oblicz fielding percentage dla baseball players",
      slug: "/pl/lekkoatletyka/kalkulator-obrona-procendowy-kalkulador",
      keywords: ""
    },
    br: {
      title: "Calculadora de Percentual de Defesa",
      description: "Calcule o percentual de defesa para jogadores de beisebol. Avalie a habilidade defensiva com base em chances convertidas em outs.",
      slug: "/br/esportes/calculadora-de-porcentagem-de-defesa",
      keywords: "percentual defesa, calculadora defensiva, habilidade defensiva, chances outs, beisebol"
    },
    de: {
      title: "Feldprozentsatz-Rechner",
      description: "Berechnen Sie den Feldprozentsatz für Baseballspieler. Bewerten Sie die defensive Fähigkeit basierend auf umgewandelten Chancen zu Outs.",
      slug: "/de/sport/feld-prozent-rechner",
      keywords: "Feldprozentsatz, Defensivrechner, defensive Fähigkeit, Chancen zu Outs, Baseball"
    }
    ,
    es: {
      title: "Calculadora de Porcentaje de Fildeo – Calcula Fácil y Rápido",
      description: "Calcula el porcentaje de fildeo al instante con nuestra herramienta precisa. ¡Mejora tu rendimiento y toma decisiones deportivas inteligentes ahora mismo",
      slug: "/es/deportes/calculadora-del-porcentaje-de-fildeo",
      keywords: "calculadora, porcentaje, fildeo, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, mejora, rendimiento, toma, decisiones, deportivas"
    }
  },
  'fielding-independent-pitching-calculator': {
    en: {
      title: "Fielding Independent Pitching Calculator",
      description: "Calculate fielding independent pitching (FIP) for baseball players",
      slug: "/sports/fielding-independent-pitching-calculator",
      keywords: "fielding, independent, pitching, calculator, calculate, fip, baseball, players"
    },
    pl: {
      title: "Fielding Independent Pitching Kalkulator",
      description: "Oblicz fielding independent pitching (FIP) dla baseball players",
      slug: "/pl/lekkoatletyka/kalkulator-obrona-niezalezny-rzucanie-kalkulador",
      keywords: ""
    },
    br: {
      title: "Calculadora de FIP (Fielding Independent Pitching)",
      description: "Calcule o FIP (Fielding Independent Pitching) para jogadores de beisebol. Métrica avançada que avalia o desempenho do pitcher independentemente da defesa.",
      slug: "/br/esportes/calculadora-de-arremesso-independente-de-defesa",
      keywords: "FIP, fielding independent pitching, calculadora pitcher, métrica avançada, desempenho pitcher, beisebol"
    },
    de: {
      title: "Fielding-Independent-Pitching-Rechner (FIP)",
      description: "Berechnen Sie das Fielding Independent Pitching (FIP) für Baseballspieler. Fortgeschrittene Metrik zur Bewertung der Pitcherleistung unabhängig von der Feldarbeit.",
      slug: "/de/sport/feld-unabhangig-werfen-rechner",
      keywords: "FIP, Fielding Independent Pitching, Pitcher-Rechner, fortgeschrittene Metrik, Pitcherleistung, Baseball"
    }
    ,
    es: {
      title: "Calculadora FIP – Calcula tu Inversión Fácil y Rápido",
      description: "Calcula tu Fondo de Inversión Pública (FIP) al instante con nuestra herramienta precisa. ¡Optimiza tus inversiones y toma decisiones inteligentes ahora",
      slug: "/es/deportes/calculadora-fip",
      keywords: "calculadora, calcula, inversión, fácil, rápido, fondo, pública, instante, nuestra, herramienta, precisa, optimiza, inversiones, toma, decisiones"
    }
  },
  'magic-number-calculator': {
    en: {
      title: "Magic Number Calculator",
      description: "Calculate the magic number for playoff contention in sports.",
      slug: "/sports/magic-number-calculator",
      keywords: "magic, number, calculator, calculate, playoff, contention, sports"
    },
    pl: {
      title: "Magic Number Kalkulator",
      description: "Oblicz the magic number dla playoff contention in sports.",
      slug: "/pl/lekkoatletyka/kalkulator-magiczny-liczba-kalkulador",
      keywords: ""
    },
    br: {
      title: "Calculadora do Número Mágico",
      description: "Calcule o número mágico para classificação nos playoffs esportivos. Saiba quantas vitórias ou derrotas dos concorrentes garantem sua vaga nos playoffs.",
      slug: "/br/esportes/calculadora-do-numero-magico",
      keywords: "número mágico, calculadora playoffs, classificação esportiva, vitórias necessárias, temporada esportiva"
    },
    de: {
      title: "Magische-Zahl-Rechner",
      description: "Berechnen Sie die magische Zahl für die Playoff-Qualifikation im Sport. Erfahren Sie, wie viele Siege oder Niederlagen der Konkurrenz Ihr Playoff-Platz sichern.",
      slug: "/de/sport/magisch-zahl-rechner",
      keywords: "magische Zahl, Playoff-Rechner, Sportklassifikation, benötigte Siege, Sportjahr"
    }
    ,
    es: {
      title: "Números Mágicos para Ganar Lotería – Descúbrelos Hoy",
      description: "Encuentra tus números mágicos para la lotería y aumenta tus posibilidades de ganar. ¡Prueba nuestra guía y juega con estrategia ahora mismo",
      slug: "/es/deportes/numeros-magicos-para-ganar-loteria",
      keywords: "números, mágicos, ganar, lotería, descúbrelos, encuentra, aumenta, posibilidades, prueba, nuestra, guía, juega, estrategia, ahora, mismo"
    }
  },
  'age-calculator': {
    en: {
      title: "Age Calculator",
      description: "Calculate age in years, months, and days",
      slug: "/age-calculator",
      keywords: "age, calculator, calculate, years, months, days"
    },
    pl: {
      title: "Kalkulator Wieku – Oblicz Swój Wiek Online Szybko",
      description: "Użyj kalkulatora wieku online, aby obliczyć dokładny wiek na podstawie daty urodzenia. Proste, szybkie i darmowe narzędzie do codziennego użytku.",
      slug: "/pl/kalkulator-wieku",
      keywords: ""
    },
    br: {
      title: "Calculadora de Idade",
      description: "Calcule a idade em anos, meses e dias com base na data de nascimento. Ferramenta útil para registros oficiais e planejamento.",
      slug: "/br/calculadora-de-idade",
      keywords: "idade, calculadora idade, anos meses dias, data nascimento, registros oficiais"
    },
    de: {
      title: "Altersrechner",
      description: "Berechnen Sie das Alter in Jahren, Monaten und Tagen basierend auf dem Geburtsdatum. Nützliches Tool für offizielle Aufzeichnungen und Planung.",
      slug: "/de/alter-rechner",
      keywords: "Alter, Altersrechner, Jahre Monate Tage, Geburtsdatum, offizielle Aufzeichnungen"
    },
    es: {
      title: "Calculadora de Edad – Descubre tu Edad Exacta al Instante",
      description: "Calcula tu edad exacta al instante con nuestra herramienta rápida y precisa. ¡Descúbrelo ahora y lleva un control de tu tiempo de manera fácil!",
      slug: "/es/calculadora-de-edad",
      keywords: "calculadora, edad, descubre, exacta, instante, calcula, nuestra, herramienta, rápida, precisa, descúbrelo, ahora, lleva, control, tiempo"
    }
  },
  'piecewise-function-calculator-grapher': {
    en: {
      title: "Piecewise Function Calculator & Grapher",
      description: "Define, evaluate, and graph piecewise functions.",
      slug: "/piecewise-function-calculator-grapher",
      keywords: "piecewise, function, calculator, grapher, define, evaluate, graph, functions"
    },
    pl: {
      title: "Kalkulator Funkcji Odcinkowej i Graficznie",
      description: "Zdefiniuj, oblicz i narysuj funkcje odcinkowe. Narzędzie matematyczne do analizy i wizualizacji funkcji kawałkowych.",
      slug: "/pl/kalkulator-odcinkowy-funkcja-kalkulador-wykres-kalkulador",
      keywords: "funkcja odcinkowa, kalkulator funkcji, grafik, funkcje kawałkowe, matematyka, wizualizacja"
    },
    br: {
      title: "Piecewise Function Calculator & Grapher",
      description: "Define, evaluate, and graph piecewise functions.",
      slug: "/br/calculadora-de-funcao-por-partes-e-graficador",
      keywords: "piecewise, function, calculator, grapher, define, evaluate, graph, functions"
    },
    de: {
      title: "Piecewise Function Rechner & Grapher",
      description: "Define, evaluate, und graph piecewise functions.",
      slug: "/de/stuckweise-funktion-rechner-grafik-rechner",
      keywords: "piecewise, function, calculator, grapher, define, evaluate, graph, functions"
    },
    es: {
      title: "Calculadora de Funciones por Tramos – Calcula Fácil y Rápido",
      description: "Resuelve funciones por tramos al instante con nuestra calculadora precisa. ¡Simplifica tus ejercicios y aprende matemáticas de manera eficiente ahora!",
      slug: "/es/calculadora-de-funciones-por-tramos",
      keywords: "calculadora, funciones, tramos, calcula, fácil, rápido, resuelve, instante, nuestra, precisa, simplifica, ejercicios, aprende, matemáticas, manera"
    }
  },
  'website-cost-calculator': {
    en: {
      title: "Website Cost Calculator - Estimate Website Development Costs",
      description: "Calculate website development costs based on features, design level, pages, SEO, e-commerce, and CMS. Get accurate estimates for your web project budget.",
      slug: "/software/website-cost-calculator",
      keywords: "website cost calculator, website development cost, web design pricing, website estimate, web development budget, website price calculator, e-commerce cost, CMS pricing"
    },
    pl: {
      title: "Kalkulator Kosztów Strony Internetowej",
      description: "Oblicz koszty tworzenia strony internetowej na podstawie funkcji, poziomu projektu, stron, SEO, e-commerce i CMS. Uzyskaj dokładne oszacowania budżetu.",
      slug: "/pl/oprogramowanie/kalkulator-kosztow-strony-internetowej",
      keywords: "kalkulator kosztów strony, koszt tworzenia strony, ceny web design, szacowanie strony, budżet strony internetowej, wycena strony"
    },
    br: {
      title: "Calculadora de Custo de Site - Estime Desenvolvimento Web",
      description: "Calcule custos de desenvolvimento de site com base em recursos, design, páginas, SEO, e-commerce e CMS. Obtenha estimativas precisas para seu orçamento.",
      slug: "/br/software/calculadora-de-custo-de-site",
      keywords: "calculadora custo site, custo desenvolvimento web, preço web design, orçamento site, estimativa website, preço e-commerce"
    },
    de: {
      title: "Website-Kosten-Rechner - Webentwicklung Kosten Schätzen",
      description: "Berechnen Sie Website-Entwicklungskosten basierend auf Funktionen, Design, Seiten, SEO, E-Commerce und CMS. Erhalten Sie genaue Budget-Schätzungen.",
      slug: "/de/software/website-kosten-rechner",
      keywords: "Website Kosten Rechner, Webentwicklung Kosten, Web Design Preise, Website Budget, E-Commerce Kosten, CMS Preise"
    },
    es: {
      title: "Calculadora de Costo de Sitio Web - Estima Desarrollo Web",
      description: "Calcula costos de desarrollo web según características, diseño, páginas, SEO, e-commerce y CMS. Obtén estimaciones precisas para tu presupuesto web.",
      slug: "/es/software/calculadora-de-costo-de-sitio-web",
      keywords: "calculadora costo sitio web, costo desarrollo web, precios diseño web, presupuesto website, estimación web, costo e-commerce"
    }
  },
  'youtube-money-calculator': {
    en: {
      title: "YouTube Money Calculator 2026 – Free YouTube Earnings Estimator",
      description: "Estimate YouTube earnings with RPM, views, CPM & sponsorship. Get daily, monthly & yearly revenue in 2026 with our free calculator.",
      slug: "/software/youtube-money-calculator",
      keywords: "youtube money calculator, youtube earnings calculator, youtube revenue calculator, youtube income estimator, how much money youtube pays, youtube cpm calculator, youtube rpm calculator, youtube sponsorship calculator, youtube ad revenue calculator 2026"
    },
    pl: {
      title: "Kalkulator Zarobków YouTube 2026 – Darmowy Estymator Przychodów",
      description: "Oszacuj zarobki YouTube za pomocą RPM, wyświetleń, CPM i sponsoringu. Uzyskaj przychody dzienne, miesięczne i roczne w 2026 roku za pomocą naszego bezpłatnego kalkulatora.",
      slug: "/pl/oprogramowanie/kalkulator-zarobkow-youtube",
      keywords: "kalkulator zarobków youtube, kalkulator przychodów youtube, estymator dochodów youtube, ile płaci youtube, kalkulator cpm youtube, kalkulator rpm youtube, kalkulator sponsoringu youtube"
    },
    br: {
      title: "Calculadora de Dinheiro do YouTube 2026 – Estimador de Ganhos Grátis",
      description: "Estime os ganhos do YouTube com RPM, visualizações, CPM e patrocínio. Obtenha receita diária, mensal e anual em 2026 com nossa calculadora gratuita.",
      slug: "/br/software/calculadora-de-dinheiro-youtube",
      keywords: "calculadora de dinheiro youtube, calculadora de ganhos youtube, calculadora de receita youtube, estimador de renda youtube, quanto o youtube paga, calculadora cpm youtube, calculadora rpm youtube, calculadora de patrocínio youtube"
    },
    de: {
      title: "YouTube Geld Rechner 2026 – Kostenloser Einnahmen-Schätzer",
      description: "Schätzen Sie YouTube-Einnahmen mit RPM, Aufrufen, CPM und Sponsoring. Erhalten Sie tägliche, monatliche und jährliche Einnahmen 2026 mit unserem kostenlosen Rechner.",
      slug: "/de/software/youtube-geld-rechner",
      keywords: "youtube geld rechner, youtube einnahmen rechner, youtube umsatz rechner, youtube einkommensrechner, wie viel zahlt youtube, youtube cpm rechner, youtube rpm rechner, youtube sponsoring rechner"
    },
    es: {
      title: "Calculadora de Dinero de YouTube 2026 – Estimador de Ganancias Gratis",
      description: "Estime las ganancias de YouTube con RPM, vistas, CPM y patrocinio. Obtenga ingresos diarios, mensuales y anuales en 2026 con nuestra calculadora gratuita.",
      slug: "/es/software/calculadora-de-dinero-youtube",
      keywords: "calculadora de dinero youtube, calculadora de ganancias youtube, calculadora de ingresos youtube, estimador de ingresos youtube, cuanto paga youtube, calculadora cpm youtube, calculadora rpm youtube, calculadora de patrocinio youtube"
    }
  },
  'enterprise-seo-roi-calculator': {
    en: {
      title: "Enterprise SEO ROI Calculator",
      description: "Calculate the return on investment (ROI) for enterprise SEO.",
      slug: "/enterprise-seo-roi-calculator",
      keywords: "enterprise, seo, roi, calculator, calculate, return, investment"
    },
    pl: {
      title: "Enterprise SEO ROI Kalkulator",
      description: "Oblicz the return on investment (ROI) dla enterprise SEO.",
      slug: "/pl/kalkulator-przedsiebiorstwo-seo-roi-kalkulador",
      keywords: ""
    },
    br: {
      title: "Calculadora de ROI de SEO Empresarial",
      description: "Calcule o retorno sobre investimento (ROI) para SEO empresarial. Otimize seu orçamento de marketing digital.",
      slug: "/br/calculadora-de-roi-de-seo-empresarial",
      keywords: "SEO empresarial, ROI SEO, calculadora marketing digital, otimização orçamento, retorno investimento"
    },
    de: {
      title: "Unternehmens-SEO-ROI-Rechner",
      description: "Berechnen Sie die Rendite (ROI) für Unternehmens-SEO. Optimieren Sie Ihr digitales Marketingbudget.",
      slug: "/de/unternehmen-seo-roi-rechner",
      keywords: "Unternehmens-SEO, SEO-ROI, Digital-Marketing-Rechner, Budget-Optimierung, Rendite"
    },
    es: {
      title: "Calculadora de ROI SEO – Mide tu Retorno Rápido y Fácil",
      description: "Calcula el ROI de tus estrategias SEO al instante y optimiza tus inversiones. ¡Descubre cuánto retorno obtienes y mejora tu marketing ahora mismo",
      slug: "/es/calculadora-de-roi-seo",
      keywords: "calculadora, mide, retorno, rápido, fácil, calcula, estrategias, instante, optimiza, inversiones, descubre, cuánto, obtienes, mejora, marketing"
    }
  },
  'rpe-calculator': {
    en: {
      title: "RPE Calculator",
      description: "Calculate the rate of perceived exertion (RPE) for various activities.",
      slug: "/rpe-calculator",
      keywords: "rpe, calculator, calculate, rate, perceived, exertion, various, activities"
    },
    pl: {
      title: "RPE Kalkulator",
      description: "Oblicz the rate of perceived exertion (RPE) dla różnych aktywności.",
      slug: "/pl/kalkulator-rpe-kalkulador",
      keywords: ""
    },
    br: {
      title: "Calculadora de RPE (Escala de Percepção de Esforço)",
      description: "Calcule a taxa de percepção de esforço (RPE) para várias atividades físicas. Monitore a intensidade do treino com precisão.",
      slug: "/br/calculadora-de-epe",
      keywords: "RPE, escala percepção esforço, calculadora treino, intensidade exercício, monitoramento treino"
    },
    de: {
      title: "RPE-Rechner (Rate of Perceived Exertion)",
      description: "Berechnen Sie die wahrgenommene Anstrengung (RPE) für verschiedene Aktivitäten. Überwachen Sie die Trainingsintensität präzise.",
      slug: "/de/rpe-rechner",
      keywords: "RPE, Rate of Perceived Exertion, Training-Rechner, Übungsintensität, Trainingsüberwachung"
    },
    es: {
      title: "Calculadora RPE – Evalúa tu Esfuerzo Físico Fácil y Rápido",
      description: "Calcula tu RPE (Percepción del Esfuerzo) al instante y optimiza tu entrenamiento. ¡Mejora tus rutinas y alcanza tus metas ahora mismo!",
      slug: "/es/calculadora-rpe",
      keywords: "calculadora, evalúa, esfuerzo, físico, fácil, rápido, calcula, percepción, instante, optimiza, entrenamiento, mejora, rutinas, alcanza, metas"
    }
  },
  'indiana-child-support-calculator': {
    en: {
      title: "Indiana Child Support Calculator",
      description: "Estimate child support payments based on Indiana state guidelines.",
      slug: "/indiana-child-support-calculator",
      keywords: "indiana, child, support, calculator, estimate, payments, based, state, guidelines"
    },
    pl: {
      title: "Indiana Child Support Kalkulator",
      description: "oszacuj child support payments na podstawie Indiana state guidelines.",
      slug: "/pl/kalkulator-indiana-dziecko-wsparcie-kalkulador",
      keywords: ""
    },
    br: {
      title: "Calculadora de Pensão Alimentícia de Indiana",
      description: "Estime os pagamentos de pensão alimentícia com base nas diretrizes do estado de Indiana. Planeje suas obrigações financeiras familiares.",
      slug: "/br/calculadora-de-pensao-alimenticia-de-indiana",
      keywords: "pensão alimentícia Indiana, calculadora pensão, diretrizes estaduais, obrigações financeiras familiares, custódia"
    },
    de: {
      title: "Indiana-Unterhaltsrechner",
      description: "Schätzen Sie Unterhaltszahlungen basierend auf den Richtlinien des Bundesstaates Indiana. Planen Sie Ihre familiären finanziellen Verpflichtungen.",
      slug: "/de/indiana-kind-unterhalt-rechner",
      keywords: "Indiana Unterhalt, Unterhaltsrechner, staatliche Richtlinien, familiäre Finanzverpflichtungen, Sorgerecht"
    },
    es: {
      title: "Calculadora de Manutención Infantil – Calcula Fácil y Rápido",
      description: "Calcula la manutención infantil al instante con nuestra herramienta precisa. ¡Conoce los pagos justos y planifica el bienestar de tus hijos ahora mismo!",
      slug: "/es/calculadora-de-manutencion-infantil",
      keywords: "calculadora, manutención, infantil, calcula, fácil, rápido, instante, nuestra, herramienta, precisa, conoce, pagos, justos, planifica, bienestar"
    }
  },
  'time-calculator': {
    en: {
      title: "Time Calculator",
      description: "Perform calculations related to time, such as duration and time zone conversions.",
      slug: "/time-calculator",
      keywords: "time, calculator, perform, calculations, related, such, duration, zone, conversions"
    },
    pl: {
      title: "Kalkulator Czasu – Oblicz Upływ Czasu Online",
      description: "Użyj kalkulatora czasu online, aby obliczyć różnicę między datami i godzinami. Proste, szybkie i darmowe narzędzie do planowania i obliczeń.",
      slug: "/pl/kalkulator-czasu",
      keywords: ""
    },
    br: {
      title: "Calculadora de Tempo",
      description: "Realize cálculos relacionados ao tempo, como duração e conversões de fuso horário. Gerencie cronogramas e prazos com eficiência.",
      slug: "/br/calculadora-de-tempo",
      keywords: "calculadora tempo, duração, conversão fuso horário, gerenciamento cronograma, prazos"
    },
    de: {
      title: "Zeitrechner",
      description: "Führen Sie Berechnungen im Zusammenhang mit der Zeit durch, wie z. B. Dauer und Zeitzonenkonvertierungen. Verwalten Sie Zeitpläne und Fristen effizient.",
      slug: "/de/zeit-rechner",
      keywords: "Zeitrechner, Dauer, Zeitzonenkonvertierung, Zeitplanverwaltung, Fristen"
    },
    es: {
      title: "Calculadora de Tiempo – Calcula Duraciones Rápida y Fácil",
      description: "Calcula tiempos y duraciones al instante con nuestra herramienta precisa. ¡Ahorra tiempo y organiza tus actividades de manera eficiente ahora mismo!",
      slug: "/es/calculadora-de-tiempo",
      keywords: "calculadora, tiempo, calcula, duraciones, rápida, fácil, tiempos, instante, nuestra, herramienta, precisa, ahorra, organiza, actividades, manera"
    }
  },
  'gpa-calculator': {
    en: {
      title: "GPA Calculator",
      description: "Calculate GPA based on course grades and credits.",
      slug: "/gpa-calculator",
      keywords: "gpa, calculator, calculate, based, course, grades, credits"
    },
    pl: {
      title: "Kalkulator Średniej Ocen – Oblicz Swoją Średnią Online",
      description: "Użyj kalkulatora średniej ocen online, aby szybko obliczyć średnią z przedmiotów i ocen. Proste, dokładne i darmowe narzędzie edukacyjne.",
      slug: "/pl/kalkulator-sredniej-ocen",
      keywords: ""
    },
    br: {
      title: "Calculadora de GPA (Média Ponderada)",
      description: "Calcule o GPA com base nas notas e créditos dos cursos. Planeje seu desempenho acadêmico e metas de graduação.",
      slug: "/br/calculadora-gpa",
      keywords: "GPA, média ponderada, calculadora notas, desempenho acadêmico, metas graduação"
    },
    de: {
      title: "GPA-Rechner (Grade Point Average)",
      description: "Berechnen Sie den GPA basierend auf Kursnoten und Credits. Planen Sie Ihre akademische Leistung und Abschlussziele.",
      slug: "/de/notendurchschnitt-rechner",
      keywords: "GPA, Notendurchschnitt, Notenrechner, akademische Leistung, Abschlussziele"
    },
    es: {
      title: "Calculadora de GPA – Calcula tu Promedio Académico Fácil",
      description: "Calcula tu GPA al instante con nuestra herramienta rápida y precisa. ¡Conoce tu promedio académico y planifica tu éxito universitario ahora mismo!",
      slug: "/es/calculadora-de-gpa",
      keywords: "calculadora, calcula, promedio, académico, fácil, nuestra, herramienta, rápida, precisa, conoce, planifica, éxito, universitario, ahora"
    }
  },
  'grade-curve-calculator': {
    en: {
      title: "Grade Curve Calculator Free Online",
      description: "Use our Grade Curve Calculator to assign A-F grades fairly with bell curve or fixed range. Step-by-step examples make grading simple and accurate.",
      slug: "/grade-curve-calculator",
      keywords: "grade curve calculator, grading curve calculator, bell curve grade calculator, curve grading calculator, grading on a curve calculator, grade calculator with curve, bell curve grading calculator, normal distribution grading"
    }
  },
  'height-calculator': {
    en: {
      title: "Height Calculator",
      description: "Calculate height in different units.",
      slug: "/height-calculator",
      keywords: "height, calculator, calculate, different, units"
    },
    pl: {
      title: "Kalkulator Wzrostu – Oblicz Przewidywany Wzrost Online",
      description: "Użyj kalkulatora wzrostu online, aby oszacować swój przyszły wzrost lub wzrost dziecka. Proste, szybkie i darmowe narzędzie zdrowotne.",
      slug: "/pl/kalkulator-wzrostu",
      keywords: ""
    },
    br: {
      title: "Calculadora de Altura",
      description: "Converta altura entre centímetros, metros, pés e polegadas com precisão instantânea. Ferramenta online gratuita, rápida e confiável.",
      slug: "/br/calculadora-de-altura",
      keywords: "calculadora altura, conversão altura, centímetros, metros, pés, polegadas, registros médicos"
    },
    de: {
      title: "Größenrechner",
      description: "Konvertieren Sie die Körpergröße zwischen verschiedenen Einheiten wie Zentimeter, Meter, Fuß und Zoll. Nützlich für medizinische und anthropometrische Aufzeichnungen.",
      slug: "/de/groben-rechner",
      keywords: "Größenrechner, Größenkonvertierung, Zentimeter, Meter, Fuß, Zoll, medizinische Aufzeichnungen"
    },
    es: {
      title: "Calculadora de Altura – Predice tu Crecimiento Fácilmente",
      description: "Usa nuestra calculadora de altura para estimar tu crecimiento o el de tus hijos. ¡Descúbrelo al instante y planifica tu desarrollo ahora mismo!",
      slug: "/es/calculadora-de-altura",
      keywords: "calculadora, altura, predice, crecimiento, fácilmente, nuestra, estimar, hijos, descúbrelo, instante, planifica, desarrollo, ahora"
    }
  },
  'ip-subnet-calculator': {
    en: {
      title: "IP Subnet Calculator",
      description: "Calculate subnets and IP ranges.",
      slug: "/ip-subnet-calculator",
      keywords: "subnet, calculator, calculate, subnets, ranges"
    },
    pl: {
      title: "Kalkulator Podsieci IP – Oblicz Sieć i Maskę Online",
      description: "Użyj kalkulatora podsieci IP online, aby obliczyć adresy sieci, maski i zakres hostów. Proste, szybkie i darmowe narzędzie dla sieciowców.",
      slug: "/pl/kalkulator-podsieci-ip",
      keywords: ""
    },
    br: {
      title: "Calculadora de Sub-rede IP",
      description: "Calcule sub-redes e intervalos de IP para otimizar o gerenciamento de rede. Planeje a segmentação e alocação de endereços.",
      slug: "/br/calculadora-desub-rede-IP",
      keywords: "sub-rede IP, calculadora rede, intervalos IP, gerenciamento rede, segmentação rede"
    },
    de: {
      title: "IP-Subnetz-Rechner",
      description: "Berechnen Sie Subnetze und IP-Bereiche zur Optimierung des Netzwerkmanagements. Planen Sie die Segmentierung und Adresszuweisung.",
      slug: "/de/ip-subnetz-rechner",
      keywords: "IP-Subnetz, Netzwerkrechner, IP-Bereiche, Netzwerkmanagement, Netzwerksegmentierung"
    },
    es: {
      title: "Calculadora de Subnet – Calcula Redes IP Fácil y Rápido",
      description: "Calcula tus subnets al instante con nuestra herramienta precisa. ¡Optimiza tus redes IP y simplifica la planificación de tus direcciones ahora mismo!",
      slug: "/es/calculadora-subnet",
      keywords: "calculadora, subnet, calcula, redes, fácil, rápido, subnets, instante, nuestra, herramienta, precisa, optimiza, simplifica, planificación, direcciones"
    }
  },
  'orthogonal-projection-calculator': {
    en: {
      title: "Orthogonal Projection Calculator",
      description: "Calculate the orthogonal projection of one vector onto another with step-by-step solutions and detailed analysis",
      slug: "/physics/orthogonal-projection-calculator",
      keywords: "orthogonal, projection, calculator, vector, dot product, linear algebra, mathematics"
    },
    pl: {
      title: "Kalkulator Rzutu Ortogonalnego",
      description: "Oblicz rzut ortogonalny jednego wektora na drugi z rozwiązaniami krok po kroku i szczegółową analizą",
      slug: "/pl/fizyka/kalkulator-rzutu-ortogonalnego",
      keywords: "rzut ortogonalny, kalkulator wektorów, iloczyn skalarny, algebra liniowa, matematyka"
    },
    br: {
      title: "Calculadora de Projeção Ortogonal",
      description: "Calcule a projeção ortogonal de um vetor sobre outro com soluções passo a passo e análise detalhada",
      slug: "/br/fisica/calculadora-de-projecao-ortogonal",
      keywords: "projeção ortogonal, calculadora vetores, produto escalar, álgebra linear, matemática"
    },
    de: {
      title: "Orthogonale Projektionsrechner",
      description: "Berechnen Sie die orthogonale Projektion eines Vektors auf einen anderen mit schrittweisen Lösungen und detaillierter Analyse",
      slug: "/de/physik/orthogonale-projektionsrechner",
      keywords: "orthogonale projektion, vektorrechner, skalarprodukt, lineare algebra, mathematik"
    },
    es: {
      title: "Calculadora de Proyección Ortogonal",
      description: "Calcule la proyección ortogonal de un vector sobre otro con soluciones paso a paso y análisis detallado",
      slug: "/es/fisica/calculadora-de-proyeccion-ortogonal",
      keywords: "proyección ortogonal, calculadora vectores, producto escalar, álgebra lineal, matemáticas"
    }
  },
  'towing-estimate-calculator': {
    en: {
      title: "Towing Estimate Calculator",
      description: "Calculate towing costs based on vehicle type, distance, location, time of day, and additional services with detailed cost breakdown",
      slug: "/towing-estimate-calculator",
      keywords: "towing, estimate, calculator, cost, vehicle, distance, roadside assistance, flatbed, towing service"
    },
    pl: {
      title: "Kalkulator Kosztów Holowania",
      description: "Oblicz koszty holowania na podstawie typu pojazdu, odległości, lokalizacji, pory dnia i dodatkowych usług ze szczegółowym podziałem kosztów",
      slug: "/pl/kalkulator-kosztow-holowania",
      keywords: "holowanie, koszty, kalkulator, pojazd, odległość, pomoc drogowa, platforma, usługa holowania"
    },
    br: {
      title: "Calculadora de Custo de Reboque",
      description: "Use a calculadora de custo de reboque para saber quanto custa chamar um reboque de carro, calcular preço por km e estimar o valor total do serviço.",
      slug: "/br/calculadora-de-custo-de-reboque",
      keywords: "reboque, custo, calculadora, veículo, distância, assistência na estrada, plataforma, serviço de reboque"
    },
    de: {
      title: "Abschleppkosten-Rechner",
      description: "Berechnen Sie Abschleppkosten basierend auf Fahrzeugtyp, Entfernung, Standort, Tageszeit und zusätzlichen Dienstleistungen mit detaillierter Kostenaufschlüsselung",
      slug: "/de/abschleppkosten-rechner",
      keywords: "abschleppen, kosten, rechner, fahrzeug, entfernung, pannenhilfe, plateau, abschleppdienst"
    },
    es: {
      title: "Calculadora de Costos de Remolque",
      description: "Calcule los costos de remolque según el tipo de vehículo, distancia, ubicación, hora del día y servicios adicionales con desglose detallado de costos",
      slug: "/es/calculadora-de-costos-de-remolque",
      keywords: "remolque, costos, calculadora, vehículo, distancia, asistencia en carretera, plataforma, servicio de remolque"
    }
  },
  'square-root-curve-calculator': {
    en: {
      title: "Square Root Curve Calculator",
      description: "Convert grades using the square root grading curve method with step-by-step calculations and instant results",
      slug: "/maths/square-root-curve-calculator",
      keywords: "square root curve, grade curve calculator, sqrt curve, grading curve, grade adjustment, curved grade, square root grading"
    },
    pl: {
      title: "Kalkulator Krzywej Pierwiastka Kwadratowego",
      description: "Konwertuj oceny za pomocą metody krzywej oceniania pierwiastka kwadratowego z obliczeniami krok po kroku",
      slug: "/pl/matematyka/kalkulator-krzywej-pierwiastka-kwadratowego",
      keywords: "krzywa pierwiastka kwadratowego, kalkulator krzywej ocen, krzywa oceniania, dostosowanie ocen, ocena zakrzywiona"
    },
    br: {
      title: "Calculadora de Curva de Raiz Quadrada",
      description: "Converta notas usando o método de curva de classificação de raiz quadrada com cálculos passo a passo",
      slug: "/br/matematica/calculadora-de-curva-de-raiz-quadrada",
      keywords: "curva de raiz quadrada, calculadora de curva de notas, curva de classificação, ajuste de notas, nota curvada"
    },
    de: {
      title: "Quadratwurzel-Kurven-Rechner",
      description: "Noten mit der Quadratwurzel-Bewertungskurvenmethode mit schrittweisen Berechnungen umrechnen",
      slug: "/de/mathe/quadratwurzel-kurven-rechner",
      keywords: "quadratwurzel kurve, notenkurven rechner, bewertungskurve, notenanpassung, gekrümmte note"
    },
    es: {
      title: "Calculadora de Curva de Raíz Cuadrada",
      description: "Convierte calificaciones usando el método de curva de calificación de raíz cuadrada con cálculos paso a paso",
      slug: "/es/matematicas/calculadora-de-curva-de-raiz-cuadrada",
      keywords: "curva de raíz cuadrada, calculadora de curva de calificaciones, curva de calificación, ajuste de calificaciones"
    }
  },
  'rucking-calorie-calculator': {
    en: {
      title: "Rucking Calorie Calculator",
      description: "Calculate calories burned during weighted walks (rucking) using the Pandolf equation. Estimate energy expenditure for military training and fitness.",
      slug: "/health/rucking-calorie-calculator",
      keywords: "rucking, calorie calculator, weighted walk, Pandolf equation, military training, ruck march, load carriage, hiking calories, backpack weight"
    },
    pl: {
      title: "Kalkulator Kalorii Rucking",
      description: "Oblicz kalorie spalone podczas marszu z obciążeniem (rucking) za pomocą równania Pandolfa. Oszacuj wydatek energetyczny dla treningu wojskowego i fitness.",
      slug: "/pl/zdrowie/kalkulator-kalorii-rucking",
      keywords: "rucking, kalkulator kalorii, marsz z obciążeniem, równanie Pandolfa, trening wojskowy, marsz z plecakiem, noszenie ciężaru, kalorie wędrówka"
    },
    br: {
      title: "Calculadora de Calorias de Rucking",
      description: "Calcule calorias queimadas durante caminhadas com peso (rucking) usando a equação de Pandolf. Estime o gasto energético para treinamento militar e fitness.",
      slug: "/br/saude/calculadora-de-calorias-de-rucking",
      keywords: "rucking, calculadora calorias, caminhada com peso, equação Pandolf, treinamento militar, marcha com mochila, transporte de carga, calorias trilha"
    },
    de: {
      title: "Rucking Kalorien Rechner",
      description: "Berechnen Sie verbrannte Kalorien beim gewichteten Gehen (Rucking) mit der Pandolf-Gleichung. Schätzen Sie den Energieverbrauch für militärisches Training und Fitness.",
      slug: "/de/gesundheit/rucking-kalorien-rechner",
      keywords: "rucking, kalorien rechner, gewichtetes gehen, Pandolf-Gleichung, militärisches training, rucksackmarsch, lasttragen, wandern kalorien"
    },
    es: {
      title: "Calculadora de Calorías de Rucking",
      description: "Calcule las calorías quemadas durante caminatas con peso (rucking) usando la ecuación de Pandolf. Estime el gasto energético para entrenamiento militar y fitness.",
      slug: "/es/salud/calculadora-de-calorias-de-rucking",
      keywords: "rucking, calculadora calorías, caminata con peso, ecuación Pandolf, entrenamiento militar, marcha con mochila, transporte de carga, calorías senderismo"
    }
  },
  'paver-base-calculator': {
    en: {
      title: "Paver Base Calculator – Calculate Gravel, Sand & Material Needed",
      description: "Free paver base calculator to estimate gravel, crushed stone, and sand required for paving projects. Supports imperial and metric units with accurate material calculations.",
      slug: "/construction/paver-base-calculator",
      keywords: "paver base calculator, gravel calculator, crushed stone calculator, sand calculator, paving materials, base material calculator, construction calculator"
    },
    pl: {
      title: "Kalkulator Podbudowy Brukowej – Oblicz Żwir, Piasek i Materiały",
      description: "Darmowy kalkulator podbudowy brukowej do szacowania żwiru, kruszywa i piasku potrzebnego do projektów brukarskich. Obsługuje jednostki imperialne i metryczne.",
      slug: "/pl/budowa/kalkulator-podbudowy-brukowej",
      keywords: "kalkulator podbudowy brukowej, kalkulator żwiru, kalkulator kruszywa, kalkulator piasku, materiały brukarskie, kalkulator materiału podbudowy"
    },
    br: {
      title: "Calculadora de Base para Pavimentação – Calcule Brita, Areia e Materiais",
      description: "Calculadora gratuita de base para pavimentação para estimar brita, pedra britada e areia necessárias para projetos de pavimentação. Suporta unidades imperiais e métricas.",
      slug: "/br/construcao/calculadora-de-base-para-pavimentacao",
      keywords: "calculadora de base para pavimentação, calculadora de brita, calculadora de pedra britada, calculadora de areia, materiais de pavimentação, calculadora de material de base"
    },
    de: {
      title: "Pflasterunterbau-Rechner – Berechnen Sie Kies, Sand und Materialien",
      description: "Kostenloser Pflasterunterbau-Rechner zur Schätzung von Kies, Schotter und Sand für Pflasterprojekte. Unterstützt imperiale und metrische Einheiten.",
      slug: "/de/konstruktion/pflasterunterbau-rechner",
      keywords: "pflasterunterbau rechner, kies rechner, schotter rechner, sand rechner, pflastermaterialien, unterbaumaterial rechner"
    },
    es: {
      title: "Calculadora de Base para Pavimento – Calcula Grava, Arena y Materiales",
      description: "Calculadora gratuita de base para pavimento para estimar grava, piedra triturada y arena necesarias para proyectos de pavimentación. Soporta unidades imperiales y métricas.",
      slug: "/es/construccion/calculadora-de-base-para-pavimento",
      keywords: "calculadora de base para pavimento, calculadora de grava, calculadora de piedra triturada, calculadora de arena, materiales de pavimentación, calculadora de material de base"
    }
  },
  'break-even-calculator': {
    en: {
      title: "Break-Even Calculator - Calculate Break-Even Point for Business",
      description: "Calculate break-even point in units and revenue. Find when your business becomes profitable with our break-even analysis calculator. Includes contribution margin and profit calculations.",
      slug: "/business/break-even-calculator",
      keywords: "break-even calculator, break-even point, break-even analysis, contribution margin, business profitability, break-even units, break-even revenue, fixed costs, variable costs"
    },
    pl: {
      title: "Kalkulator Progu Rentowności - Oblicz Punkt Równowagi Biznesowej",
      description: "Oblicz próg rentowności w jednostkach i przychodach. Dowiedz się, kiedy Twoja firma staje się rentowna dzięki naszemu kalkulatorowi analizy progu rentowności.",
      slug: "/pl/biznes/kalkulator-progu-rentownosci",
      keywords: "kalkulator progu rentowności, punkt rentowności, analiza rentowności, marża kontrybucyjna, rentowność biznesu, jednostki rentowności, przychód rentowności"
    },
    br: {
      title: "Calculadora de Ponto de Equilíbrio - Calcule Quando Seu Negócio Lucra",
      description: "Calcule o ponto de equilíbrio em unidades e receita. Descubra quando seu negócio se torna lucrativo com nossa calculadora de análise de ponto de equilíbrio.",
      slug: "/br/negocios/calculadora-de-ponto-de-equilibrio",
      keywords: "calculadora ponto equilíbrio, ponto equilíbrio, análise equilíbrio, margem contribuição, lucratividade negócio, unidades equilíbrio, receita equilíbrio"
    },
    de: {
      title: "Break-Even-Rechner - Berechnen Sie die Gewinnschwelle für Ihr Unternehmen",
      description: "Berechnen Sie den Break-Even-Punkt in Einheiten und Umsatz. Finden Sie heraus, wann Ihr Unternehmen profitabel wird mit unserem Break-Even-Analyse-Rechner.",
      slug: "/de/geschaft/break-even-rechner",
      keywords: "Break-Even-Rechner, Gewinnschwelle, Break-Even-Analyse, Deckungsbeitrag, Unternehmensrentabilität, Break-Even-Einheiten, Break-Even-Umsatz"
    },
    es: {
      title: "Calculadora de Punto de Equilibrio - Calcula Rentabilidad del Negocio",
      description: "Calcula el punto de equilibrio en unidades e ingresos. Descubre cuándo tu negocio se vuelve rentable con nuestra calculadora de análisis de punto de equilibrio.",
      slug: "/es/negocios/calculadora-de-punto-de-equilibrio",
      keywords: "calculadora punto equilibrio, punto equilibrio, análisis equilibrio, margen contribución, rentabilidad negocio, unidades equilibrio, ingresos equilibrio"
    }
  },
  'startup-costs-calculator': {
    en: {
      title: "Business Startup Cost Calculator - Estimate Total Startup Expenses",
      description: "Calculate total business startup costs and funding requirements. Free startup cost calculator to estimate all expenses including equipment, marketing, legal fees, and operational costs for your new business.",
      slug: "/business/startup-costs-calculator",
      keywords: "startup cost calculator, business startup costs, startup expenses, business funding calculator, initial investment calculator, startup budget, business launch costs, entrepreneur cost estimator, small business startup"
    },
    pl: {
      title: "Kalkulator Kosztów Rozpoczęcia Działalności - Oszacuj Wydatki Startowe",
      description: "Oblicz całkowite koszty rozpoczęcia działalności i wymagania finansowe. Darmowy kalkulator kosztów startowych do oszacowania wszystkich wydatków, w tym sprzętu, marketingu, opłat prawnych i kosztów operacyjnych dla nowej firmy.",
      slug: "/pl/biznes/kalkulator-kosztow-rozpoczecia-dzialalnosci",
      keywords: "kalkulator kosztów startowych, koszty rozpoczęcia działalności, wydatki startowe, kalkulator finansowania biznesu, kalkulator inwestycji początkowej, budżet startowy, koszty uruchomienia firmy, szacowanie kosztów przedsiębiorcy"
    },
    br: {
      title: "Calculadora de Custos de Abertura de Empresa - Estime Gastos Iniciais",
      description: "Calcule os custos totais de abertura de empresa e requisitos de financiamento. Calculadora gratuita de custos de abertura para estimar todas as despesas incluindo equipamentos, marketing, taxas legais e custos operacionais para seu novo negócio.",
      slug: "/br/negocios/calculadora-de-custos-de-abertura",
      keywords: "calculadora custos abertura, custos iniciais empresa, despesas startup, calculadora financiamento negócio, calculadora investimento inicial, orçamento startup, custos lançamento empresa, estimador custos empreendedor, pequena empresa abertura"
    },
    de: {
      title: "Gründungskosten-Rechner - Schätzen Sie Ihre Startup-Gesamtkosten",
      description: "Berechnen Sie die gesamten Gründungskosten und Finanzierungsanforderungen. Kostenloser Gründungskostenrechner zur Schätzung aller Ausgaben einschließlich Ausrüstung, Marketing, Rechtsgebühren und Betriebskosten für Ihr neues Unternehmen.",
      slug: "/de/geschaft/grundungskosten-rechner",
      keywords: "Gründungskostenrechner, Unternehmensgründungskosten, Startup-Ausgaben, Geschäftsfinanzierungsrechner, Anfangsinvestitionsrechner, Startup-Budget, Geschäftsstartkosten, Unternehmer-Kostenschätzer, Kleinunternehmensgründung"
    },
    es: {
      title: "Calculadora de Costos de Inicio de Negocio - Estime Gastos Totales de Startup",
      description: "Calcule los costos totales de inicio de negocio y requisitos de financiamiento. Calculadora gratuita de costos de inicio para estimar todos los gastos incluyendo equipamiento, marketing, honorarios legales y costos operacionales para su nuevo negocio.",
      slug: "/es/negocios/calculadora-de-costos-de-inicio",
      keywords: "calculadora costos inicio, costos iniciales negocio, gastos startup, calculadora financiamiento negocio, calculadora inversión inicial, presupuesto startup, costos lanzamiento empresa, estimador costos emprendedor, pequeña empresa inicio"
    }
  },
  'app-cost-calculator': {
    en: {
      title: "App Cost Calculator - Estimate Mobile & Web App Development Cost",
      description: "Calculate app development cost with our feature-based estimator. Get instant quotes for mobile and web apps including design, features, security, and development hours. Free app cost calculator.",
      slug: "/software/app-cost-calculator",
      keywords: "app cost calculator, app development cost, mobile app cost, web app cost, app development estimator, app pricing calculator, software development cost, app budget calculator, MVP cost calculator, app features pricing"
    },
    pl: {
      title: "Kalkulator Kosztów Aplikacji - Oszacuj Koszt Rozwoju Aplikacji",
      description: "Oblicz koszt rozwoju aplikacji za pomocą naszego estymatora opartego na funkcjach. Uzyskaj natychmiastowe wyceny dla aplikacji mobilnych i webowych, w tym projekt, funkcje, bezpieczeństwo i godziny rozwoju.",
      slug: "/pl/oprogramowanie/kalkulator-kosztow-aplikacji",
      keywords: "kalkulator kosztów aplikacji, koszt rozwoju aplikacji, koszt aplikacji mobilnej, koszt aplikacji webowej, estymator rozwoju aplikacji, kalkulator cen aplikacji, koszt rozwoju oprogramowania, kalkulator budżetu aplikacji, koszt MVP"
    },
    br: {
      title: "Calculadora de Custo de App - Estime Custo de Desenvolvimento de Aplicativo",
      description: "Calcule o custo de desenvolvimento de app com nosso estimador baseado em recursos. Obtenha orçamentos instantâneos para apps móveis e web incluindo design, recursos, segurança e horas de desenvolvimento.",
      slug: "/br/software/calculadora-de-custo-de-app",
      keywords: "calculadora custo app, custo desenvolvimento app, custo app móvel, custo app web, estimador desenvolvimento app, calculadora preço app, custo desenvolvimento software, calculadora orçamento app, custo MVP"
    },
    de: {
      title: "App-Kosten Rechner - Schätzen Sie Mobile & Web App Entwicklungskosten",
      description: "Berechnen Sie App-Entwicklungskosten mit unserem funktionsbasierten Schätzer. Erhalten Sie sofortige Angebote für mobile und Web-Apps einschließlich Design, Funktionen, Sicherheit und Entwicklungsstunden.",
      slug: "/de/software/app-kosten-rechner",
      keywords: "App-Kosten Rechner, App-Entwicklungskosten, Mobile-App-Kosten, Web-App-Kosten, App-Entwicklungsschätzer, App-Preisrechner, Softwareentwicklungskosten, App-Budgetrechner, MVP-Kostenrechner"
    },
    es: {
      title: "Calculadora de Costo de App - Estime Costo de Desarrollo de Aplicación",
      description: "Calcule el costo de desarrollo de app con nuestro estimador basado en funciones. Obtenga cotizaciones instantáneas para apps móviles y web incluyendo diseño, funciones, seguridad y horas de desarrollo.",
      slug: "/es/software/calculadora-de-costo-de-app",
      keywords: "calculadora costo app, costo desarrollo app, costo app móvil, costo app web, estimador desarrollo app, calculadora precio app, costo desarrollo software, calculadora presupuesto app, costo MVP"
    }
  },
  'implant-size-calculator': {
    en: {
      title: "Breast Implant Size Calculator – Find Your Perfect Fit",
      description: "Use our Breast Implant Size Calculator to find the ideal implant volume and cup size for a natural, proportional look. Calculate cc to cup size conversions instantly.",
      slug: "/implant-size-calculator",
      keywords: "breast implant calculator, breast implant size calculator, breast implant cc calculator, implant size chart, breast augmentation calculator, breast implant cup size calculator, cc to cup size, implant volume calculator"
    }
  },
  'reverse-percentage-calculator': {
    en: {
      title: "Reverse Percentage Calculator – Find Original Prices Fast",
      description: "Calculate original prices, discounts, or tax amounts instantly with our free reverse percentage calculator online or in Excel.",
      slug: "/maths/reverse-percentage-calculator",
      keywords: "reverse percentage calculator, reverse percentages calculator, reverse percentage calculator online, reverse percentage discount calculator, reverse percentage formula, how to calculate reverse percentages, reverse percentage increase calculator, reverse percentage decrease calculator"
    }
  },
  'therapy-productivity-calculator':{
    en:{
      title: "Therapy Productivity Calculator",
      description: "Calculate therapy productivity with our free online calculator. Estimate patient load, therapy duration, and productivity metrics.",
      slug: "/therapy-productivity-calculator",
      keywords: "therapy productivity calculator, therapy productivity metrics, therapy productivity online, therapy productivity estimation, therapy productivity formula, therapy productivity increase calculator, therapy productivity decrease calculator"
    }
  },
  'acres-per-hour-calculator': {
    en: {
      title: "Acres Per Hour Calculator | Mowing, Planting & More",
      description: "Calculate acres per hour for mowing, planting, spraying, and tillage using width, speed, and efficiency. Fast, accurate results.",
      slug: "/acres-per-hour-calculator",
      keywords: "acres per hour calculator, acre per hour calculator, mowing acres per hour, planting calculator, spraying calculator, tillage calculator, bush hog calculator, farm equipment calculator, acres covered per hour, field efficiency calculator, acres per hour mowing, acres per hour planting"
    }
  },
  'notice-period-calculator': {
    en: {
      title: "Notice Period Calculator – Calculate Last Working Day",
      description: "Free online notice period calculator to instantly find your last working day, notice duration, end date, and estimate notice period pay accurately.",
      slug: "/notice-period-calculator",
      keywords: "notice period calculator, calculate notice period, last working day calculator, notice period end date, notice period pay calculator, resignation calculator, employment notice calculator, notice duration calculator, calendar days calculator, working days calculator"
    }
  }
};
