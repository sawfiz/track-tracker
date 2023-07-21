// Libraries
import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export default function NewsBrief({ news, headlineOnly }) {
  const { date, headline, text, photoURL, publish } = news.data();
  return (
    <div>
      {headlineOnly ? (
        <>
          {date} <Link to={`/news/${news.id}`}>{headline}</Link>{' '}
        </>
      ) : (
        <div className="grid grid-cols-[120px_auto] gap-2 mb-3  outline-dashed outline-pink-300 px-1 py-2">
          <div className="w-full max-h-[100px] rounded-md overflow-hidden">
            {photoURL ? (
              <img
                className="w-full h-full object-cover object-center "
                src={photoURL}
                alt="news"
              />
            ) : (
              <S.CroppedImage
                className="w-full h-full object-cover object-center"
                src="/images/default-news.png"
                alt="news"
              />
            )}
          </div>
          <div>
            <div className="text-slate-600">{date}</div>
            <Link
              to={`/news/${news.id}`}
              className={'no-underline text-slate-700'}
            >
              {headline}{' '}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                size="xs"
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
