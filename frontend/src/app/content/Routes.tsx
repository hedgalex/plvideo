import { Route, Routes as RouterRoutes } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Container, Logo, Nav, NavItem } from './styles';
import TvIcon from '@mui/icons-material/Tv';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import HistoryIcon from '@mui/icons-material/History';
import { TVShowsPage } from './pages/TVShows';
import { SearchPage } from './pages/Search';
import { ShowPage } from './pages/Show';

export const Routes: React.FC = () => (
  <>
    <Container>
      <Nav>
        <Logo>PlVideo</Logo>
        <NavItem href="/tvshows">
          <TvIcon className="icon" width="20px" height="20px" />
          <Typography ml="20px">Top TV Shows</Typography>
        </NavItem>
        <NavItem href="/movies">
          <LocalMoviesIcon className="icon" width="20px" height="20px" />
          <Typography ml="20px">Top Movies</Typography>
        </NavItem>
        <NavItem href="/search">
          <SearchIcon className="icon" width="20px" height="20px" />
          <Typography ml="20px">Search</Typography>
        </NavItem>
        <NavItem href="/downloads">
          <DownloadIcon className="icon" width="20px" height="20px" />
          <Typography ml="20px">Downloads</Typography>
        </NavItem>
        <NavItem href="/recent">
          <HistoryIcon className="icon" width="20px" height="20px" />
          <Typography ml="20px">Recent</Typography>
        </NavItem>
      </Nav>
      <RouterRoutes>
        <Route path="/" element={<TVShowsPage />} />
        <Route path="/tvshows" element={<TVShowsPage />} />
        <Route path="/movies" element={<TVShowsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/show/:service/:showId" element={<ShowPage />} />
        <Route path="/downloads" element={<TVShowsPage />} />
      </RouterRoutes>
    </Container>
  </>
);
