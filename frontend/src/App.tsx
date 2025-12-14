import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import "./App.css";

const API_BASE = "http://localhost:8000";

// GraphQL query
const GET_PAGES = gql`
  query GetPages {
    pages {
      id
      title
      slug
      pageType
    }
  }
`;

interface Page {
	id: number;
	meta: {
		type: string;
		detail_url: string;
		html_url: string;
	};
	title: string;
}

interface RestApiResponse {
	meta: {
		total_count: number;
	};
	items: Page[];
}

interface GraphQLPage {
	id: string;
	title: string;
	slug: string;
	pageType: string;
}

interface GetPagesData {
	pages: GraphQLPage[];
}

function RestApiSection() {
	const [pages, setPages] = useState<Page[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch(`${API_BASE}/api/v2/pages/`)
			.then((res) => {
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
				return res.json();
			})
			.then((data: RestApiResponse) => {
				setPages(data.items);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	if (loading) return <p>Loading REST API...</p>;
	if (error) return <p className="error">REST API Error: {error}</p>;

	return (
		<div className="section">
			<h2>REST API (/api/v2/pages/)</h2>
			<ul>
				{pages.map((page) => (
					<li key={page.id}>
						<strong>{page.title}</strong>
						<span className="type">{page.meta.type}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

function GraphQLSection() {
	const { loading, error, data } = useQuery<GetPagesData>(GET_PAGES);

	if (loading) return <p>Loading GraphQL...</p>;
	if (error) return <p className="error">GraphQL Error: {error.message}</p>;
	if (!data) return null;

	return (
		<div className="section">
			<h2>GraphQL (/graphql/)</h2>
			<ul>
				{data.pages.map((page) => (
					<li key={page.id}>
						<strong>{page.title}</strong>
						<span className="type">{page.pageType}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

function App() {
	return (
		<div className="app">
			<h1>Wagtail API Playground</h1>
			<p className="subtitle">Comparing REST API vs GraphQL</p>

			<div className="grid">
				<RestApiSection />
				<GraphQLSection />
			</div>

			<div className="info">
				<h3>Backend URLs</h3>
				<ul>
					<li>
						<a href={`${API_BASE}/admin/`} target="_blank">
							Wagtail Admin
						</a>
					</li>
					<li>
						<a href={`${API_BASE}/api/v2/pages/`} target="_blank">
							REST API
						</a>
					</li>
					<li>
						<a href={`${API_BASE}/graphql/`} target="_blank">
							GraphQL Playground
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default App;
