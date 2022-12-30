import { Route, Routes as RouterRoutes } from 'react-router-dom';
import TvIcon from '@mui/icons-material/Tv';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import HistoryIcon from '@mui/icons-material/History';
import { EShowTypes } from '~shared/.consts';
import { ListPage } from './pages/List';
import { SearchPage } from './pages/Search';
import { ShowPage } from './pages/Show';
import { Downloads } from './pages/Downloads';
import { Container, Logo, Nav, NavItem, NavTitle } from './styles';

export const Routes: React.FC = () => (
  <Container>
    <Nav>
      <Logo>PlVideo</Logo>
      <NavItem href="/tvshows">
        <TvIcon className="icon" width="20px" height="20px" />
        <NavTitle>Top TV Shows</NavTitle>
      </NavItem>
      <NavItem href="/movies">
        <LocalMoviesIcon className="icon" width="20px" height="20px" />
        <NavTitle>Top Movies</NavTitle>
      </NavItem>
      <NavItem href="/search">
        <SearchIcon className="icon" width="20px" height="20px" />
        <NavTitle>Search</NavTitle>
      </NavItem>
      <NavItem href="/downloads">
        <DownloadIcon className="icon" width="20px" height="20px" />
        <NavTitle>Downloads</NavTitle>
      </NavItem>
      <NavItem href="/recent">
        <HistoryIcon className="icon" width="20px" height="20px" />
        <NavTitle>Recent</NavTitle>
      </NavItem>
    </Nav>
    <RouterRoutes>
      <Route path="/" element={<ListPage type={EShowTypes.TVSHOW} />} />
      <Route path="/tvshows" element={<ListPage type={EShowTypes.TVSHOW} />} />
      <Route path="/movies" element={<ListPage type={EShowTypes.MOVIE} />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/show/:id" element={<ShowPage />} />
      <Route path="/downloads" element={<Downloads />} />
    </RouterRoutes>
  </Container>
);
