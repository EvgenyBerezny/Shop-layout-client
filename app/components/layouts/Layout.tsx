import { ILayoutProps } from '@/app/types/common'
import Footer from '../modules/Footer/Footer'
import Header from '../modules/Header/Header'

const Layout = ({ children }: ILayoutProps) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)

export default Layout
