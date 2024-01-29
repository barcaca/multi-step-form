import { FrontEndMentorIcon, GitHubIcon } from './icon/icon'
import { IconLink } from './icon/icon-link'

// Componente de rodapé introdutório
export function Footer() {
  return (
    <div className="absolute left-1/2 hidden -translate-x-1/2 flex-wrap justify-center gap-x-1 gap-y-3 sm:gap-x-2 lg:bottom-5 lg:flex lg:justify-start">
      <IconLink
        href={'https://www.frontendmentor.io/profile/Barcaca'}
        icon={FrontEndMentorIcon}
      >
        FrontEnd Mentor
      </IconLink>
      <IconLink
        href={'https://github.com/barcaca/todo-app-list'}
        icon={GitHubIcon}
      >
        GitHub
      </IconLink>
    </div>
  )
}
