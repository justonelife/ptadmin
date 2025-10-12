import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { explicitEffect } from 'ngxtension/explicit-effect';
import { STEP } from '../types';

const mock_variables = {
  // Headers & Titles
  header_title: {
    en: 'You are ready to trade!',
    es: '¡Estás listo para operar!',
    pt: 'Você está pronto para operar!',
    de: 'Sie sind bereit zu handeln!',
    zh: '您已准备好进行交易！',
  },
  next_steps_header: {
    en: 'Your next steps',
    es: 'Tus próximos pasos',
    pt: 'Seus próximos passos',
    de: 'Ihre nächsten Schritte',
    zh: '后续步骤',
  },
  access_dashboard_header: {
    en: 'Access your dashboard',
    es: 'Accede a tu panel',
    pt: 'Acesse seu painel',
    de: 'Greifen Sie auf Ihr Dashboard zu',
    zh: '访问您的仪表板',
  },
  dashboard_login_title: {
    en: 'Dashboard Login',
    es: 'Acceso al Panel',
    pt: 'Login do Painel',
    de: 'Dashboard-Anmeldung',
    zh: '仪表板登录',
  },
  open_platform_header: {
    en: 'Open DXTrade',
    es: 'Abrir DXTrade',
    pt: 'Abrir DXTrade',
    de: 'DXTrade öffnen',
    zh: '打开 DXTrade',
  },
  platform_login_title: {
    en: 'Platform Login',
    es: 'Acceso a la Plataforma',
    pt: 'Login da Plataforma',
    de: 'Plattform-Anmeldung',
    zh: '平台登录',
  },
  join_our: {
    en: 'Join our',
    es: 'Únete a nuestro',
    pt: 'Junte-se ao nosso',
    de: 'Treten Sie unserem bei',
    zh: '加入我们的',
  },

  // Body Text
  greeting: {
    en: 'Hi',
    es: 'Hola',
    pt: 'Olá',
    de: 'Hallo',
    zh: '你好',
  },
  your_challenge_prefix: {
    en: 'Your',
    es: 'Tu',
    pt: 'Seu',
    de: 'Ihre',
    zh: '您的',
  },
  your_challenge_suffix: {
    en: 'is ready.',
    es: 'está listo.',
    pt: 'está pronto.',
    de: 'ist bereit.',
    zh: '已准备就绪。',
  },
  addon_early_payout: {
    en: '+ Early Payout',
    es: '+ Pago Anticipado',
    pt: '+ Saque Antecipado',
    de: '+ Vorzeitige Auszahlung',
    zh: '+ 提前支付',
  },
  addon_profit_share: {
    en: '+ Profit Split',
    es: '+ Reparto de Beneficios',
    pt: '+ Divisão de Lucros',
    de: '+ Gewinnbeteiligung',
    zh: '+ 利润分成',
  },
  addon_account_reset: {
    en: '+ Account reset',
    es: '+ Restablecimiento de Cuenta',
    pt: '+ Reset de Conta',
    de: '+ Kontorücksetzung',
    zh: '+ 账户重置',
  },
  steps_intro: {
    en: "We've outlined the simple steps below so you can log in and start trading right away.",
    es: 'Hemos descrito los sencillos pasos a continuación para que puedas iniciar sesión y comenzar a operar de inmediato.',
    pt: 'Descrevemos os passos simples abaixo para que você possa fazer login e começar a operar imediatamente.',
    de: 'Wir haben die einfachen Schritte unten aufgeführt, damit Sie sich sofort einloggen und mit dem Handeln beginnen können.',
    zh: '我们已在下方列出简单步骤，以便您立即登录并开始交易。',
  },
  next_steps_description: {
    en: "Let's get you set up and ready to trade! Follow these steps to access your dashboard and open your trading platform.",
    es: '¡Vamos a prepararte para operar! Sigue estos pasos para acceder a tu panel y abrir tu plataforma de trading.',
    pt: 'Vamos configurar tudo para você começar a operar! Siga estes passos para acessar seu painel e abrir sua plataforma de negociação.',
    de: 'Lassen Sie uns Sie einrichten und bereit für den Handel machen! Befolgen Sie diese Schritte, um auf Ihr Dashboard zuzugreifen und Ihre Handelsplattform zu öffnen.',
    zh: '让我们为您完成设置，准备开始交易！请按照以下步骤访问您的仪表板并打开您的交易平台。',
  },
  access_dashboard_description: {
    en: 'Log in to view your account, track your performance, and monitor your progress.',
    es: 'Inicia sesión para ver tu cuenta, seguir tu rendimiento y monitorear tu progreso.',
    pt: 'Faça login para ver sua conta, acompanhar seu desempenho e monitorar seu progresso.',
    de: 'Melden Sie sich an, um Ihr Konto einzusehen, Ihre Leistung zu verfolgen und Ihren Fortschritt zu überwachen.',
    zh: '登录以查看您的账户、跟踪您的表现并监控您的进度。',
  },
  platform_login_description: {
    en: 'Log in to the platform to begin trading.',
    es: 'Inicia sesión en la plataforma para comenzar a operar.',
    pt: 'Faça login na plataforma para começar a operar.',
    de: 'Melden Sie sich bei der Plattform an, um mit dem Handeln zu beginnen.',
    zh: '登录平台开始交易。',
  },
  discord_promo_subheader: {
    en: 'For giveaways, competitions, and to connect with other traders',
    es: 'Para sorteos, concursos y para conectar con otros traders',
    pt: 'Para sorteios, competições e para se conectar com outros traders',
    de: 'Für Giveaways, Wettbewerbe und um sich mit anderen Händlern zu vernetzen',
    zh: '参与赠品、竞赛活动，并与其他交易者建立联系',
  },
  community_welcome_message: {
    en: 'We are excited to see your performance and glad to have you as part of the Funded Prime community!',
    es: '¡Estamos emocionados de ver tu rendimiento y contentos de tenerte como parte de la comunidad de Funded Prime!',
    pt: 'Estamos animados para ver seu desempenho e felizes por ter você como parte da comunidade Funded Prime!',
    de: 'Wir freuen uns auf Ihre Leistung und sind froh, Sie als Teil der Funded Prime-Community zu haben!',
    zh: '我们很高兴看到您的表现，并欢迎您成为 Funded Prime 社区的一员！',
  },
  socials_prompt: {
    en: 'Do not forget to check out our socials and connect with other Funded Prime traders.',
    es: 'No olvides visitar nuestras redes sociales y conectar con otros traders de Funded Prime.',
    pt: 'Não se esqueça de conferir nossas redes sociais e se conectar com outros traders da Funded Prime.',
    de: 'Vergessen Sie nicht, unsere sozialen Medien zu besuchen und sich mit anderen Funded Prime-Händlern zu vernetzen.',
    zh: '别忘了查看我们的社交媒体，并与其他 Funded Prime 交易者建立联系。',
  },
  need_help_prompt: {
    en: 'Need more help? Reach out to our customer support team:',
    es: '¿Necesitas más ayuda? Contacta a nuestro equipo de soporte al cliente:',
    pt: 'Precisa de mais ajuda? Entre em contato com nossa equipe de suporte ao cliente:',
    de: 'Benötigen Sie weitere Hilfe? Kontaktieren Sie unser Kundensupport-Team:',
    zh: '需要更多帮助吗？请联系我们的客户支持团队：',
  },
  sign_off_message: {
    en: 'Good luck with your trades',
    es: 'Buena suerte con tus operaciones',
    pt: 'Boa sorte com suas operações',
    de: 'Viel Erfolg bei Ihren Trades',
    zh: '祝您交易顺利',
  },
  the_team_prefix: {
    en: 'The',
    es: 'El equipo de',
    pt: 'A Equipe',
    de: 'Das Team von',
    zh: '',
  },
  the_team_suffix: {
    en: 'Team',
    es: '',
    pt: '',
    de: '',
    zh: '团队',
  },

  // Labels & Buttons
  username_label: {
    en: 'Username',
    es: 'Usuario',
    pt: 'Usuário',
    de: 'Benutzername',
    zh: '用户名',
  },
  password_label: {
    en: 'Password',
    es: 'Contraseña',
    pt: 'Senha',
    de: 'Passwort',
    zh: '密码',
  },
  trading_login_label: {
    en: 'Trading login',
    es: 'Login de trading',
    pt: 'Login de negociação',
    de: 'Handels-Login',
    zh: '交易登录名',
  },
  account_number_label: {
    en: 'Account number',
    es: 'Número de cuenta',
    pt: 'Número da conta',
    de: 'Kontonummer',
    zh: '账户号码',
  },
  trading_password_label: {
    en: 'Trading password',
    es: 'Contraseña de trading',
    pt: 'Senha de negociação',
    de: 'Handelspasswort',
    zh: '交易密码',
  },
  login_button: {
    en: 'Login',
    es: 'Iniciar Sesión',
    pt: 'Entrar',
    de: 'Anmelden',
    zh: '登录',
  },
  login_to_platform_button: {
    en: 'Login to Platform',
    es: 'Iniciar Sesión en la Plataforma',
    pt: 'Entrar na Plataforma',
    de: 'Bei der Plattform anmelden',
    zh: '登录平台',
  },
  join_now_button: {
    en: 'Join now',
    es: 'Únete ahora',
    pt: 'Junte-se agora',
    de: 'Jetzt beitreten',
    zh: '立即加入',
  },
  login_here_link: {
    en: 'Login here',
    es: 'Inicia sesión aquí',
    pt: 'Faça login aqui',
    de: 'Hier anmelden',
    zh: '在此登录',
  },

  // Image Alt Text
  alt_instagram: {
    en: 'Instagram',
    es: 'Instagram',
    pt: 'Instagram',
    de: 'Instagram',
    zh: 'Instagram',
  },
  alt_discord: {
    en: 'Discord',
    es: 'Discord',
    pt: 'Discord',
    de: 'Discord',
    zh: 'Discord',
  },
  alt_x: {
    en: 'X',
    es: 'X',
    pt: 'X',
    de: 'X',
    zh: 'X',
  },
  alt_facebook: {
    en: 'Facebook',
    es: 'Facebook',
    pt: 'Facebook',
    de: 'Facebook',
    zh: 'Facebook',
  },
};

interface State {
  currentStep: STEP;
  languages: string[];
  variables: Record<string, Record<string, string>>;
}

const initialState: State = {
  currentStep: STEP.LANGUAGES_SETUP,
  languages: ['en', 'es', 'pt', 'de'],
  variables: mock_variables,
};

export const Store = signalStore(
  withState(initialState),
  withMethods((store) => ({
    setStep(step: STEP): void {
      patchState(store, { currentStep: step });
    },
    addLanguage(language: string): void {
      if (store.languages().includes(language)) return;
      patchState(store, { languages: [...store.languages(), language] });
    },
    removeLanguageAt(index: number): void {
      if (index < 0 || index >= store.languages().length) return;
      store.languages().splice(index, 1);
      patchState(store, { languages: [...store.languages()] });
    },
    addVariable(variable: string): void {
      if (!variable || store.variables()[variable]) return;
      patchState(store, {
        variables: {
          ...store.variables(),
          [variable]: store
            .languages()
            .reduce((acc, cur) => ({ ...acc, [cur]: '' }), {}),
        },
      });
    },
    removeVariable(key: string): void {
      delete store.variables()[key];
    },
    goNextStep(): void {
      if (store.currentStep() === STEP.PREVIEW) return;
      patchState(store, { currentStep: store.currentStep() + 1 });
    },
    goPreviousStep(): void {
      if (store.currentStep() === 0) return;
      patchState(store, { currentStep: store.currentStep() - 1 });
    },
    updateVariables(value: State['variables']): void {
      patchState(store, { variables: { ...store.variables(), ...value } });
    },
  })),
  withHooks({
    onInit(store) {
      explicitEffect([store.languages], ([_languages]) => {
        const entries = Object.entries(store.variables()).map(
          ([variable, valueInLanguages]) => {
            let newValueInLanguages: Record<string, string> = {};
            _languages.forEach((lang) => {
              if (
                !Object.prototype.hasOwnProperty.call(valueInLanguages, lang)
              ) {
                newValueInLanguages = { ...newValueInLanguages, [lang]: '' };
              } else {
                newValueInLanguages = {
                  ...newValueInLanguages,
                  [lang]: valueInLanguages[lang],
                };
              }
            });

            return [variable, newValueInLanguages];
          }
        );
        patchState(store, { variables: Object.fromEntries(entries) });
      });
    },
  })
);
