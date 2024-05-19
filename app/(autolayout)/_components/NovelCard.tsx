import React from 'react';
// import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import Link from 'next/link';

function NovelCard ({ name='', img='', id=0, description='' }){
  return (
    <Link href={`/novel/${id}`} passHref>
      <CardActionArea component="a">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={img}
            alt={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Link>
  );
};

// NovelCard.propTypes = {
//   name: PropTypes.string.isRequired,
//   imgsrc: PropTypes.string.isRequired,
//   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   description: PropTypes.string.isRequired,
// };

export default NovelCard;
