import IssueArticle from '../contains/Issue-article'
import Articles from '../contains/Articles'

const routes = [
  { path: '/article',
    exact: true,
    main: Articles
  },
  { path: '/issue',
    main: IssueArticle
  }
]

export default routes