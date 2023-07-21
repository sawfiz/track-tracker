// Libraries
import React from 'react';
import { Link } from 'react-router-dom';

// Styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export default function NewsBrief({ news, headlineOnly }) {
  const { date, headline, text, photoURL, publish } = news.data();

  const imgSrc = photoURL ? photoURL : '/images/default-news.png';
  const image = (
    <img
      className="w-full h-full object-cover object-center "
      src={imgSrc}
      alt="news"
    />
  );

  const headlineContent = (
    <div>
      <div className="text-slate-600">{date}</div>
      <Link to={`/news/${news.id}`} className={'no-underline text-slate-700'}>
        {headline}
      </Link>{' '}
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" />
    </div>
  );

  return (
    <div>
      {headlineOnly ? (
        <div className='my-3 outline-dashed outline-pink-500 p-1'>{headlineContent}</div>
      ) : (
        <div className="grid grid-cols-[120px_auto] gap-2 mb-3  outline-dashed outline-pink-300 px-1 py-2">
          <div className="w-full max-h-[100px] rounded-md overflow-hidden">
            {image}
          </div>
          {headlineContent}
        </div>
      )}
    </div>
  );
}
