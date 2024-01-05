import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCalendarAlt, faCircle } from '@fortawesome/free-solid-svg-icons';
import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import StatusMessageParser from '../StatusMessageParser';
import ProblemService from '../../services/ProblemService';
import { Issue, Problem } from '../../types';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  problems: Problem[];
};

const ProblemsOverview: React.FC<Props> = ({ problems }: Props) => {
  const router = useRouter();
  const userId: number = parseInt(router.query.userId as string);
  const deviceId: number = parseInt(router.query.deviceId as string);

  const [newDescription, setNewDescription] = useState('');
  const [newDescriptionError, setNewDescriptionError] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);

  const [selectedProblemId, setSelectedProblemId] = useState(null);


  const handleClosePopup = () => {
    setSelectedProblemId(null);
  };

  const handleStatusChange = (problemId: number, newStatus: string) => {
  };

  const validate = (): boolean => {
    let isValid = true;

    if (!newDescription || newDescription.trim() === '') {
      setNewDescriptionError('Omschrijven mag niet leeg zijn');
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);
    setNewDescriptionError('');

    if (validate()) {
      const issue: Issue = {
        description: newDescription,
      };

      const problem: Problem = {
        issue,
        deviceId,
        status: '',
      };

      const response = await ProblemService.addProblem(problem);
      const data = await response.json();

      if (response.status === 200) {
        setStatusMessage({
          type: 'success',
          message: 'Probleem is toegevoegd.',
        });

        setTimeout(() => {
          setStatusMessage({
            type: 'success',
            message: '',
          });
          setNewDescription('');
        }, 2000);
      } else {
        setStatusMessage({
          type: 'error',
          message: data.errorMessage,
        });
      }
    }
  };

  const ColorStatus = (status: string) => {
    if (status === 'open') {
      return '#3e66fb';
    } else if (status === 'gesloten') {
      return '#3cd070';
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        style={{
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '20px',
        }}
      >
        <StatusMessageParser statusMessage={statusMessage} />

        <h4>Nieuw probleem</h4>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="newDescription">Omschrijving</Form.Label>
          <Form.Control
            id="newDescription"
            type="text"
            value={newDescription}
            onChange={(event) => {
              setNewDescription(event.target.value);
            }}
          />
          <Form.Text className="text-muted">
            {newDescriptionError && (
              <div className="text-danger">{newDescriptionError}</div>
            )}
          </Form.Text>
        </Form.Group>

        <Button variant="outline-success" type="submit">
          Toevoegen
        </Button>
      </Form>
      <br />
      <br />
      {problems && problems.length > 0 ? (
        <>
          <h4 className="text-center mb-4">Overzicht Problemen</h4>
          <table className="table table-hover table-borderd">
            <thead className="table table-dark thead">
              <tr>
                <th scope="col" className="col-md-1"></th>
                <th scope="col">Omschrijven</th>
                <th scope="col">Oplossing</th>
                <th scope="col" className="text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem, index) => (
                <React.Fragment key={index}>
                  <tr className="align-middle">
                    <td>
                      <Link
                        href={`/users/${userId}/devices/${deviceId}/schedule`}
                        className="btn btn-outline-dark"
                        title="afspraak plannen met reparateur"
                      >
                        <FontAwesomeIcon size="xs" icon={faCalendarAlt} />{' '}
                      </Link>
                    </td>
                    <td>{problem.issue.description}</td>
                    <td>{problem.issue.answer ? problem.issue.answer : '_____'}</td>
                    <td className="text-center">
                    <DropdownButton
                        id={`status-dropdown-${problem.id}`}
                        title={
                          <FontAwesomeIcon
                            icon={faCircle}
                            style={{ color: ColorStatus(problem.status) }}
                            title={problem.status}
                          />
                        }
                        variant="Info"
                      >
                        {/* Options for DropdownButton */}
                        <Dropdown.Item onClick={() => handleStatusChange(problem.id, 'gesloten')}>
                          <FontAwesomeIcon icon={faCircle} style={{ color: '#3cd070' }} />
                          <span className="ms-2"> Gesloten </span>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleStatusChange(problem.id, 'open')}>
                          <FontAwesomeIcon icon={faCircle} style={{ color: '#3e66fb' }} />
                          <span className="ms-2"> Open </span>
                        </Dropdown.Item>
                      </DropdownButton>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p className="text-center">Dit toestel heeft geen problemen.</p>
      )}

      <br />
      <Link href={`/users/${userId}/devices`} className="btn btn-outline-danger px-4 fs-6">
        <FontAwesomeIcon size="xs" icon={faArrowLeft} /> Terug
      </Link>
      <br />
      <br />

    </>
  );
};

export default ProblemsOverview;