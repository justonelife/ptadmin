import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
  Config,
  KeyPipe,
  MailTemplateEditorService,
  PreviewResult,
} from '@features/mail-template-editor/data-access';
import { LibTabItem, LibTabsModule } from '@libs/lib-tabs';
import { tap } from 'rxjs';
import { PreviewComponent } from '../preview/preview.component';
import { TemplateEditorComponent } from '../template-editor/template-editor.component';
import { VariablesConfigComponent } from '../variables-config/variables-config.component';

const TABS: LibTabItem[] = [
  {
    label: 'Template Editor',
    value: 'template-editor',
    icon: 'code',
  },
  {
    label: 'Variables',
    value: 'variables',
    icon: 'language',
  },
];

@Component({
  selector: 'app-mail-template-editor-shell',
  templateUrl: './shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LibTabsModule,
    TemplateEditorComponent,
    VariablesConfigComponent,
    PreviewComponent,
    FormsModule,
    KeyPipe,
  ],
})
export class ShellComponent {
  readonly service = inject(MailTemplateEditorService);
  readonly cdr = inject(ChangeDetectorRef);

  readonly TABS = TABS;

  template = signal(mock);

  config: Config = {
    languages: ['en', 'pt', 'es', 'de', 'zh'],
    variables: mock_variables,
  };
  result: PreviewResult = {};

  constructor() {
    this.service.generateObs
      .pipe(
        tap(() => {
          this.generate();
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  generate() {
    console.log('generate...');
    this.result = {};
    this.config.languages.forEach((language) => {
      this.result[language] = this.template();
      for (const key in this.config.variables) {
        const value = this.config.variables[key][language];
        // debugger;
        this.result[language] = this.result[language].replace(
          new RegExp(`{{${key}}}`, 'g'),
          value
        );
      }
    });

    this.cdr.markForCheck();
  }

  templateChange(value: string) {
    this.template.set(value);
  }
}

const mock = `
<div style="background-image: url('https://d1tya197yf99mz.cloudfront.net/images/email-templates/WelcomeHero.png'); background-size: cover; height: 250px;"></div>
<div style="padding: 0 2.5rem">
    <h1 style="margin-top: 2rem; font-weight: 700;">{{header_title}}</h1>
    <p style="margin-bottom: 0.5rem;">{{greeting}} {customer_name},</p>
    <p style="margin-top: 0;">{{your_challenge_prefix}} {challenge_name}<span style="display:{hiden_early_payout};"> {{addon_early_payout}}</span> <span style="display:{hiden_profit_share};"> {{addon_profit_share}}</span> <span style="display:{hiden_account_reset};"> {{addon_account_reset}}</span> {{your_challenge_suffix}}</p>
    <p>{{steps_intro}}</p>
    <h3 style="font-weight: 700; margin-bottom: 0.5rem; margin-top: 2rem;">{{next_steps_header}}</h3>
    <p>{{next_steps_description}}</p>
    <h3 style="font-weight: 700; margin-bottom: 0; margin-top: 1rem;">{{access_dashboard_header}}</h3>
    <p style="margin-top: 0.2rem">{{access_dashboard_description}}</p>
    <div style="width: 100%; display: flex;">
        <img width="48%" style="margin-right: auto" src="https://d1tya197yf99mz.cloudfront.net/images/email-templates/PortalLogin.png">
        <div style="width: 48%; background: #ebebeb; border-radius: 13px;">
            <br><br>
            <p style="text-align: center; width: 100%">
                <span style="font-weight: 700; font-size: 1rem;">{{dashboard_login_title}}</span><br>
                <span style="font-weight: 700; font-size: 0.8rem;">{{username_label}}</span>: {profile_username}<br>
                <span style="font-weight: 700; font-size: 0.8rem;">{{password_label}}</span>: {profile_password}<br><br>
                <a href="{login_link}" target="_blank" style="display: block; padding: 0 1rem; height: 25px; line-height: 25px; background: #1f61d2; color: #d1ed6b; border-radius: 30px; width: fit-content; margin: 0 auto; font-size: 9px; text-decoration: none;">{{login_button}}</a>
            </p>
        </div>
    </div>
    <h3 style="font-weight: 700; margin-top: 2rem; margin-bottom: 0;">{{open_platform_header}}</h3>
    <p style="margin-top: 0.2rem;">{{platform_login_description}}</p>
    <div style="width: 100%; display: flex;">
        <img width="48%" style="margin-right: auto;" src="https://d1tya197yf99mz.cloudfront.net/images/email-templates/TLLogin.png">
        <div style="width:48%; background: #ebebeb; border-radius: 13px;">
            <br>
            <p style="text-align: center; width: 100%;">
                <span style="font-weight: 700;font-size: 1rem;">{{platform_login_title}}</span><br>
                <span style="font-weight: 700;font-size: 0.8rem;">{{trading_login_label}}</span>: {trading_account_login}<br>
                <span style="font-weight: 700;font-size: 0.8rem;">{{account_number_label}}</span>: {trading_account_number}<br>
                <span style="font-weight: 700;font-size: 0.8rem;">{{trading_password_label}}</span>: {trading_account_password}<br><br>
                <a href="{platform_url}" target="_blank" style="display: block; padding: 0 1rem; height: 25px; line-height: 25px; background: #1f61d2; color: #d1ed6b; border-radius: 30px; width: fit-content; margin: 0 auto; font-size: 9px; text-decoration: none;">{{login_to_platform_button}}</a>
            </p>
        </div>
    </div>
</div>
<br><br><br>
<div style="background-image: url('https://d1tya197yf99mz.cloudfront.net/images/email-templates/DiscordBackground.png'); background-size: cover; height: 160px; padding: 0 33px;">
    <br><br><br>
    <h3 style="font-weight: 700; color: white; margin-bottom: 0;">{{join_our}} <span style="color: #c7f269;">Discord</span></h3>
    <h4 style="color: white; margin-bottom: 0.75rem;">{{discord_promo_subheader}}</h4>
    <a href="https://discord.com/invite/KgkZbAhnAG" target="_blank" style="height: 20px; line-height: 20px; padding: 4px 8px; background: #1f61d2; color: #d1ed6b; border-radius: 30px; font-size: 0.75rem; text-decoration: none;">{{join_now_button}}</a>
</div>
<div style="padding: 0 2.5rem;">
    <p>{{community_welcome_message}}</p>
    <p>{{socials_prompt}}</p>
<!--
    <p style="padding-top: 1rem; padding-bottom: 3rem;">
        <a href="https://www.instagram.com/fundedprime/" target="_blank" style="margin-right: 15px;"><img src="{system.ui.portal.url}/images/brand_icons/instagram.png" alt="{{alt_instagram}}" width="40" height="40" /></a>
        <a href="https://discord.com/invite/KgkZbAhnAG" target="_blank" style="margin-right: 15px;"><img src="{system.ui.portal.url}/images/brand_icons/discord.png" alt="{{alt_discord}}" width="40" height="40" /></a>
        <a href="https://x.com/i/flow/login?redirect_after_login=%2FFundedPrime" target="_blank" style="margin-right: 15px;"><img src="{system.ui.portal.url}/images/brand_icons/x.png" alt="{{alt_x}}" width="40" height="40" /></a>
        <a href="https://www.facebook.com/profile.php?id=61562736903884" target="_blank"><img src="{system.ui.portal.url}/images/brand_icons/facebook.png" alt="{{alt_facebook}}" width="40" height="40" /></a>
    </p>
--!>
    <p>{{need_help_prompt}}<br><span style="font-weight: 700;"><a href="mailto:support@fundedprime.com">support@fundedprime.com</a></span></p>
    <p>{{sign_off_message}},<br><span style="font-weight: 700;">{{the_team_prefix}} {trading_service_name} {{the_team_suffix}}</span></p>
    <hr>
    <p style="font-weight: 700"><a class="link" target="_blank" href="{platform_url}">{{login_here_link}}</a></p>
</div>
`;

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
