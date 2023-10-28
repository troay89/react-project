// import classes from './Content.module.css';
// import getCharacters from '../../api/api';
// import ContentI from '../../entity/Content';
// import React, { Component } from 'react';
// import Card from './Card/Card';
//
// interface ContentDefaultProps {}
//
// interface ContentProps extends ContentDefaultProps {}
//
// interface contentState {
//   content: ContentI;
//   search: string;
// }
//
// type DefaultProps = Readonly<ContentDefaultProps>;
// type Props = Readonly<ContentProps>;
// type State = Readonly<contentState>;
//
// export default class Content extends Component<Props, State> {
//   public static readonly defaultProps: DefaultProps = {};
//
//   async getContent() {
//     this.setState({ search: localStorage.getItem('searchValue') ?? '' });
//     const result = await getCharacters();
//     this.setState({ content: result });
//   }
//
//   componentDidMount?(): void {
//     this.getContent().then((r) => r);
//   }
//
//   shouldComponentUpdate(nextState: Readonly<State>): boolean {
//     this.setState({ search: localStorage.getItem('searchValue') ?? '' });
//     console.log(nextState.search);
//     return true;
//   }
//
//   render(): React.ReactElement {
//     return (
//       <main className={classes.containerCard}>
//         {this.state?.content?.results.map((characterInfo) => {
//           return (
//             <Card
//               key={characterInfo.id}
//               id={characterInfo.id}
//               linkImage={characterInfo.image}
//               nameCharacter={characterInfo.name}
//               species={characterInfo.species}
//               gender={characterInfo.gender}
//             />
//           );
//         })}
//       </main>
//     );
//   }
// }
