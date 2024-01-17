import React from 'react'

type DetailsType = {
  children: React.ReactNode
}

const DetailContainer = ({ children }: DetailsType): React.ReactNode => (
  <div className="flex flex-row justify-between mr-4">
    { children }
  </div>
)

const Details = ({ children }: DetailsType): React.ReactNode => {
  return (
    <div className="flex flex-row justify-between mt-3 text-gray-500">
      { children }
    </div>
  )
}

const BirthDay = ({ children }: DetailsType): React.ReactNode => {
  return (
    <DetailContainer>
      { children }
    </DetailContainer>
  )
}

const JoinDate = ({ children }: DetailsType): React.ReactNode => {
  return (
    <DetailContainer>
      { children }
    </DetailContainer>
  )
}

const Location = ({ children }: DetailsType): React.ReactNode => {
  return (
    <DetailContainer>
      { children }
    </DetailContainer>
  )
}

Details.BirthDay = BirthDay
Details.JoinDate = JoinDate
Details.Location = Location

export default Details
